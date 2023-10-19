
import { paginationHelper } from '../../../helper/paginationHelper';

import { IGenericResponse } from '../../interface/common';
import { IPaginationOption } from '../../interface/pagination';

import ApiError from '../../errors/ApiError';
import { RATING_SEARCHABLE_FIELDS } from './consent.ratingFeedback';
import { IRatingFeedBack, IRatingFeedBackFilters } from './interface.ratingFeedback';
import { RatingFeedBackModel } from './model.ratingFeedback';
import { Types } from 'mongoose';




const createRatingFeedBackByDb = async (payload: IRatingFeedBack): Promise<IRatingFeedBack> => {
  const result = (await RatingFeedBackModel.create(payload)).populate([
    {
      path: 'user',
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
      path: 'booking',
    },
  ]);

  return result;
};

//getAllCourseFromDb
const getAllRatingFeedBackFromDb = async (
  filters: IRatingFeedBackFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IRatingFeedBack[]>> => {
  //****************search and filters start************/
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: RATING_SEARCHABLE_FIELDS.map(field =>
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
        field === 'service'
          ? { [field]: new Types.ObjectId(value) }
          : field === 'user'
          ? { [field]: new Types.ObjectId(value) }
          : { [field]: value }
      ),
    });
  }

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

  const result = await RatingFeedBackModel.find(whereConditions)
  .populate([
    {
      path: 'user',
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
      path: 'booking',
    },
    {
      path: 'service',
    },
  ])
    .sort(sortConditions)
    .skip(Number(skip))
    .limit(Number(limit));
  const total = await RatingFeedBackModel.find(whereConditions).countDocuments();

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
const getSingleRatingFeedBackFromDb = async (id: string): Promise<IRatingFeedBack | null> => {
  const result = await RatingFeedBackModel.findById(id).populate([
    {
      path: 'user',
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
      path: 'booking',
    },
    {
      path: 'service',
    },
  ]);

  return result;
};

// update e form db
const updateRatingFeedBackFromDb = async (
  id: string,
  payload: Partial<IRatingFeedBack>
): Promise<IRatingFeedBack | null> => {
  const { ...otherData } = payload;
  const updateData = { ...otherData };

  const result = await RatingFeedBackModel.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ApiError(500, 'RatingFeedBackModel update fail!!😪😭😰');
  }
  return result;
};

// delete e form db
const deleteRatingFeedBackByIdFromDb = async (
  id: string
): Promise<IRatingFeedBack | null> => {
  const result = await RatingFeedBackModel.findByIdAndDelete(id);
  return result;
};

export const RatingFeedBackService = {
  createRatingFeedBackByDb,
  getAllRatingFeedBackFromDb,
  getSingleRatingFeedBackFromDb,
  updateRatingFeedBackFromDb,
  deleteRatingFeedBackByIdFromDb,
};
