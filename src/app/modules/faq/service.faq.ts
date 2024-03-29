import { PipelineStage, Types } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';

import { IGenericResponse } from '../../interface/common';
import { IPaginationOption } from '../../interface/pagination';
import { FAQ_SEARCHABLE_FIELDS } from './consent.faq';
import { IFaq, IFaqFilters } from './interface.faq';
import { Faq } from './model.faq';



const createFaqByDb = async (payload: IFaq): Promise<IFaq> => {
  const result = (await Faq.create(payload));
  return result;
};

//getAllFaqFromDb
const getAllFaqFromDb = async (
  filters: IFaqFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IFaq[]>> => {
  //****************search and filters start************/
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: FAQ_SEARCHABLE_FIELDS.map(field => ({
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

  // const result = await Faq.find(whereConditions)
  //   .populate('thumbnail')
  //   .sort(sortConditions)
  //   .skip(Number(skip))
  //   .limit(Number(limit));
  const pipeline: PipelineStage[] = [
    { $match: whereConditions },
    {
      $lookup: {
        from: 'fileuploades',
        let: { conditionField: '$thumbnail' }, // The field to match from the current collection
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$conditionField'], // The condition to match the fields
              },
            },
          },

          // Additional pipeline stages for the second collection (optional)
          {
            $project: {
              createdAt: 0,
              updatedAt: 0,
              userId: 0,
            },
          },
          {
            $addFields: {
              link: {
                $concat: [
                  process.env.REAL_HOST_SERVER_SIDE,
                  '/',
                  'images',
                  '/',
                  '$filename',
                ],
              },
            },
          },
        ],
        as: 'thumbnailInfo', // The field to store the matched results from the second collection
      },
    },

    {
      $project: { thumbnail: 0 },
    },
    //মনে রাখতে হবে যদি এটি দেওয়া না হয় তাহলে সে যখন কোন একটি ক্যাটাগরির থাম্বেল না পাবে সে তাকে দেবে না
    {
      $addFields: {
        thumbnail: {
          $cond: {
            if: { $eq: [{ $size: '$thumbnailInfo' }, 0] },
            then: [{}],
            else: '$thumbnailInfo',
          },
        },
      },
    },
    {
      $project: {
        thumbnailInfo: 0,
      },
    },
    {
      $unwind: '$thumbnail',
    },
    { $sort: sortConditions },
    { $skip: Number(skip) || 0 },
    { $limit: Number(limit) || 15 },
  ];

  // console.log(pipeline);
  const result = await Faq.aggregate(pipeline);
  // console.log(result, 127);
  const total = await Faq.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single Faqe form db
const getSingleFaqFromDb = async (
  id: string
): Promise<IFaq | null> => {
  const pipeline: PipelineStage[] = [
    { $match: { _id: new Types.ObjectId(id) } },
    ///***************** */ images field ******start
   
    ///***************** */ images field ******end*********

    ///
  ];

  const result = await Faq.aggregate(pipeline);

  return result[0];
};

// update Faqe form db
const updateFaqFromDb = async (
  id: string,
  payload: Partial<IFaq>
): Promise<IFaq | null> => {
  const result = await Faq.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// delete Faqe form db
const deleteFaqByIdFromDb = async (
  id: string
): Promise<IFaq | null> => {
  const result = await Faq.findByIdAndDelete(id).populate('thumbnail');
  return result;
};

export const FaqService = {
  createFaqByDb,
  getAllFaqFromDb,
  getSingleFaqFromDb,
  updateFaqFromDb,
  deleteFaqByIdFromDb,
};
