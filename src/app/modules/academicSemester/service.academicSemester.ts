import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../errors/ApiError';
import { IGenericResponse } from '../../interface/common';
import { IPaginationOption } from '../../interface/pagination';
import {
  ACADEMIC_SEMESTER_SEARCHABLE_FIELDS,
  ACADEMIC_SEMESTER_TITLE_CODE_MAPPER,
} from './consent.academicSemester';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './interface.academicSemester';
import { AcademicSemester } from './model.academicSemester';

const createAcademicSemesterByDb = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  //এখানে চেক করা হচ্ছে সেমিস্টারের নামের সাথে তার কোড মিল আছে কিনা
  if (ACADEMIC_SEMESTER_TITLE_CODE_MAPPER[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

//getAllAcademicSemesterFromDb
const getAllAcademicSemesterFromDb = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  //****************search and filters start************/
  const { searchTerm, ...filtersData } = filters;
  // export const ACADEMIC_SEMESTER_SEARCHABLE_FIELDS = ['title', 'code', 'year'];
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: ACADEMIC_SEMESTER_SEARCHABLE_FIELDS.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  /* 
   const andConditions = [
    {
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
        {
          year: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
        {
          code: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
      ],
    },
  ]; */

  //Filters
  /*
   console.log(Object.entries(filtersData));
   এইভাবে দিলে সে অবজেক্টের key এবং value মিলিয়ে এরে বানিয়ে দেবে 
  ans: { year: '2021', title: 'Autumn' }
      [ [ 'year', '2021' ], [ 'title', 'Autumn' ] ] 
  */

  //
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

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //****************pagination end ***************/

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(Number(skip))
    .limit(Number(limit));

  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single semestere form db
const getSignleSemesterFromDb = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

// update semestere form db
const updateSemesterFromDb = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    ACADEMIC_SEMESTER_TITLE_CODE_MAPPER[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// delete semestere form db
const deleteSemesterByIdFromDb = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterByDb,
  getAllAcademicSemesterFromDb,
  getSignleSemesterFromDb,
  updateSemesterFromDb,
  deleteSemesterByIdFromDb,
};
