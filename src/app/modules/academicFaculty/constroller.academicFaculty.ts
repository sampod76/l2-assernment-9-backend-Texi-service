import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';
import { ACADEMIC_FACULTY_FILTERABLE_FIELDS } from './consent.academicFaculty';
import { IAcademicFaculty } from './interface.academicFaculty';
import { AcademicFacultyService } from './service.academicFaculty';

// import { z } from 'zod'
const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicData } = req.body;
    const result = await AcademicFacultyService.createAcademicFacultyByDb(
      academicData
    );

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull create academic Faculty',
      data: result,
    });
    // next();
    /* res.status(200).send({
      success: true,
      data: result,
      message: 'successfull create academic Faculty',
    }); */
  }
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    //****************search and filter start******* */

    const filters = pick(req.query, ACADEMIC_FACULTY_FILTERABLE_FIELDS);

    //****************pagination start************ */

    const paginationOptions = pick(req.query, PAGINATION_FIELDS);

    const result = await AcademicFacultyService.getAllAcademicFacultyFromDb(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicFaculty[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull Get academic Faculty',
      meta: result.meta,
      data: result.data,
    });
    // next();
  }
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

    const result = await AcademicFacultyService.getSignleFacultyFromDb(id);

    /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull get academic Faculty',
      data: result,
    });
  }
);
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

    const result = await AcademicFacultyService.updateFacultyFromDb(
      id,
      updateData
    );

    /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull update academic Faculty',
      data: result,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.deleteFacultyByIdFromDb(id);
    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull delete academic Faculty',
      data: result,
    });
  }
);
export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
