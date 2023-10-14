/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../errors/ApiError';
import { IGenericResponse } from '../../interface/common';
import { IPaginationOption } from '../../interface/pagination';
import { User } from '../users/users.model';
import { GeneralUser } from './generalUser.model';
import { generalUserSearchableFields } from './generalUser.constant';
import { IGeneralUser, IGeneralUserFilters } from './generalUser.interface';

const getAllGeneralUsers = async (
  filters: IGeneralUserFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IGeneralUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: generalUserSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await GeneralUser.find(whereConditions)
    
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await GeneralUser.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleGeneralUser = async (id: string): Promise<IGeneralUser | null> => {
  const result = await GeneralUser.findOne({ _id:id });
  return result;
};

const updateGeneralUser = async (
  id: string,
  payload: Partial<IGeneralUser>
): Promise<IGeneralUser | null> => {
  const isExist = await GeneralUser.findOne({ _id:id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'GeneralUser not found !');
  }

  const {  ...GeneralUserData } = payload;

  const updatedStudentData: Partial<IGeneralUser> = { ...GeneralUserData };



  const result = await GeneralUser.findOneAndUpdate({ _id:id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteGeneralUser = async (id: string): Promise<IGeneralUser | null> => {
  // check if the faculty is exist
  const isExist = await GeneralUser.findOne({ _id:id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete student first
    const student = await GeneralUser.findOneAndDelete({ _id:id }, { session });
    if (!student) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ _id:id });
    session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const GeneralUserService = {
  getAllGeneralUsers,
  getSingleGeneralUser,
  updateGeneralUser,
  deleteGeneralUser,
};
