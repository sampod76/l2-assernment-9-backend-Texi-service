
import { paginationHelper } from '../../../helper/paginationHelper';

import { IGenericResponse } from '../../interface/common';
import { IPaginationOption } from '../../interface/pagination';

import ApiError from '../../errors/ApiError';
import { SERVICE_SEARCHABLE_FIELDS } from './service.consent';
import { IService, IServiceFilters } from './service.interface';
import { Service } from './service.model';
import { Types } from 'mongoose';


const createServiceByDb = async (payload: IService): Promise<IService> => {
  const result = (await Service.create(payload)).populate([
    {
      path: 'publisher',
      select: {
        needsPasswordChange: 0,
        createdAt: 0,
        updatedAt: 0,
        password: 0,
        __v: 0,
      },
      populate: [
        {
          path: 'superAdmin',
          select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
        {
          path: 'generalUser',
          select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
        {
          path: 'admin',
          select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
      ],
    },
    {
      path: 'category',
    },
  ]);
  return result;
};

//getAllCourseFromDb
const getAllServiceFromDb = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IService[]>> => {
  //****************search and filters start************/
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: SERVICE_SEARCHABLE_FIELDS.map(field =>
        //search array value
        field === 'tag'
          ? { [field]: { $in: [new RegExp(searchTerm, 'i')] } }
          : {
              [field]: new RegExp(searchTerm, 'i'),
            }
      ),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) =>
        field === 'category'
          ? { [field]: new Types.ObjectId(value) }
          : { [field]: value }
      ),
    });
  }
console.log(filtersData);
  //****************search and filters end**********/

  //****************pagination start **************/

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: 1 | -1 } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }

  //****************pagination end ***************/

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .populate([
      {
        path: 'publisher',
        select: {
          needsPasswordChange: 0,
          createdAt: 0,
          updatedAt: 0,
          password: 0,
          __v: 0,
        },
        populate: [
          {
            path: 'superAdmin',
            select: { createdAt: 0, updatedAt: 0, __v: 0 },
          },
          {
            path: 'generalUser',
            select: { createdAt: 0, updatedAt: 0, __v: 0 },
          },
          {
            path: 'admin',
            select: { createdAt: 0, updatedAt: 0, __v: 0 },
          },
        ],
      },
      {
        path: 'category',
      },
    ])
    .sort(sortConditions)
    .skip(Number(skip))
    .limit(Number(limit));
  const total = await Service.find(whereConditions).countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single e form db
const getSingleServiceFromDb = async (id: string): Promise<IService | null> => {
  const result = await Service.findById(id).populate([
    {
      path: 'publisher',
      select: {
        needsPasswordChange: 0,
        createdAt: 0,
        updatedAt: 0,
        password: 0,
        __v: 0,
      },
      populate: [
        {
          path: 'superAdmin',
          select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
        {
          path: 'generalUser',
          select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
        {
          path: 'admin',
          select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
      ],
    },
    {
      path: 'category',
    },
  ]);

  return result;
};

// update e form db
const updateServiceFromDb = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const { ...otherData } = payload;
  const updateData = { ...otherData };

  const result = await Service.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ApiError(500, 'Service update fail!!😪😭😰');
  }
  return result;
};

// delete e form db
const deleteServiceByIdFromDb = async (
  id: string
): Promise<IService | null> => {
  const result = await Service.findByIdAndDelete(id);
  return result;
};

export const TravelService = {
  createServiceByDb,
  getAllServiceFromDb,
  getSingleServiceFromDb,
  updateServiceFromDb,
  deleteServiceByIdFromDb,
};
