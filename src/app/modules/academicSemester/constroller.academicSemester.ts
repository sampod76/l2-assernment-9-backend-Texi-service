import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';
import { ACADEMIC_SEMESTER_FILTERABLE_FIELDS } from './consent.academicSemester';
import { IAcademicSemester } from './interface.academicSemester';
import { AcademicSemesterService } from './service.academicSemester';

// import { z } from 'zod'
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemesterByDb(
      academicData
    );

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull create academic semester',
      data: result,
    });
    // next();
    /* res.status(200).send({
      success: true,
      data: result,
      message: 'successfull create academic semester',
    }); */
  }
);

const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    //****************search and filter start******* */
    // export const ACADEMIC_SEMESTER_FILTERABLE_FIELDS=['searchTerm', 'year', 'code', 'title']
    const filters = pick(req.query, ACADEMIC_SEMESTER_FILTERABLE_FIELDS);

    //****************pagination start************ */
    //এখানে আমাদের দেওয়া বা নির্দিষ্ট করা ফিল গুলোর মধ্যে যে ফিল্মগুলো front end থেকে আসবে ওগুলোকে ছেঁকে নেওয়া হচ্ছে | অর্থাৎ কিছু কিছু ফিল্ড হবে undifind ওগুলোকে বাদ দিয়ে দেয়া হচ্ছে
    //PAGINATION_FIELDS =["page","limit","sortBy","sortOrder"]
    const paginationOptions = pick(req.query, PAGINATION_FIELDS);

    const result = await AcademicSemesterService.getAllAcademicSemesterFromDb(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull create academic semester',
      meta: result.meta,
      data: result.data,
    });
    // next();
  }
);

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

    const result = await AcademicSemesterService.getSignleSemesterFromDb(id);

    /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull get academic semester',
      data: result,
    });
  }
);
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

    const result = await AcademicSemesterService.updateSemesterFromDb(
      id,
      updateData
    );

    /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull get academic semester',
      data: result,
    });
  }
);

const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.deleteSemesterByIdFromDb(id);
    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull get academic semester',
      data: result,
    });
  }
);
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
