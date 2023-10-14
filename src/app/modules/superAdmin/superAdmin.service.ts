/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../errors/ApiError';
import { IGenericResponse } from '../../interface/common';
import { IPaginationOption } from '../../interface/pagination';
import { User } from '../users/users.model';
import { superAdminSearchableFields } from './superAdmin.constant';
import { ISuperAdmin, ISuperAdminFilters } from './superAdmin.interface';
import { SuperAdmin } from './superAdmin.model';

const getAllSuperAdmins = async (
  filters: ISuperAdminFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<ISuperAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: superAdminSearchableFields.map(field => ({
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

  const result = await SuperAdmin.find(whereConditions)
    
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await SuperAdmin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSuperAdmin = async (id: string): Promise<ISuperAdmin | null> => {
  const result = await SuperAdmin.findOne({ _id:id });
  return result;
};

const updateSuperAdmin = async (
  id: string,
  payload: Partial<ISuperAdmin>
): Promise<ISuperAdmin | null> => {
  const isExist = await SuperAdmin.findOne({ _id:id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const { name, ...adminData } = payload;

  const updatedStudentData: Partial<ISuperAdmin> = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<ISuperAdmin>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await SuperAdmin.findOneAndUpdate({ _id:id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteSuperAdmin = async (id: string): Promise<ISuperAdmin | null> => {
  // check if the faculty is exist
  const isExist = await SuperAdmin.findOne({ _id:id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete student first
    const student = await SuperAdmin.findOneAndDelete({ _id:id }, { session });
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

export const SuperAdminService = {
  getAllSuperAdmins,
  getSingleSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
