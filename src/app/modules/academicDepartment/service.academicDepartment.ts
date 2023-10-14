import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';

import { IGenericResponse } from '../../interface/common';
import { IPaginationOption } from '../../interface/pagination';
import { ACADEMIC_DEPARTMENT_SEARCHABLE_FIELDS } from './consent.academicDepartment';

import { AcademicDepartment } from './model.academicDepartment';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './interface.academicDepartment';

const createAcademicDepartmentByDb = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

//getAllAcademicDepartmentFromDb
const getAllAcademicDepartmentFromDb = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  //****************search and filters start************/
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: ACADEMIC_DEPARTMENT_SEARCHABLE_FIELDS.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //****************pagination end ***************/

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(Number(skip))
    .limit(Number(limit));

  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single Departmente form db
const getSignleDepartmentFromDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  /* const result = await AcademicDepartment.findById(id).populate(
    'academic_facultys'
  ); */
  return result;
};

// update Departmente form db
const updateDepartmentFromDb = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

// delete Departmente form db
const deleteDepartmentByIdFromDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentByDb,
  getAllAcademicDepartmentFromDb,
  getSignleDepartmentFromDb,
  updateDepartmentFromDb,
  deleteDepartmentByIdFromDb,
};
