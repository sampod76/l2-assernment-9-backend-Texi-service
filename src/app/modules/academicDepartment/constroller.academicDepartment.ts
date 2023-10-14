import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';

import { AcademicDepartmentService } from './service.academicDepartment';
import { IAcademicDepartment } from './interface.academicDepartment';
import { ACADEMIC_DEPARTMENT_FILTERABLE_FIELDS } from './consent.academicDepartment';

// import { z } from 'zod'
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicData } = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartmentByDb(
      academicData
    );

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull create academic Department',
      data: result,
    });
    // next();
    /* res.status(200).send({
      success: true,
      data: result,
      message: 'successfull create academic Department',
    }); */
  }
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    //****************search and filter start******* */

    const filters = pick(req.query, ACADEMIC_DEPARTMENT_FILTERABLE_FIELDS);

    //****************pagination start************ */

    const paginationOptions = pick(req.query, PAGINATION_FIELDS);

    const result =
      await AcademicDepartmentService.getAllAcademicDepartmentFromDb(
        filters,
        paginationOptions
      );

    sendResponse<IAcademicDepartment[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull Get academic Department',
      meta: result.meta,
      data: result.data,
    });
    // next();
  }
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

    const result = await AcademicDepartmentService.getSignleDepartmentFromDb(
      id
    );

    /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull get academic Department',
      data: result,
    });
  }
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

    const result = await AcademicDepartmentService.updateDepartmentFromDb(
      id,
      updateData
    );

    /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull update academic Department',
      data: result,
    });
  }
);

const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicDepartmentService.deleteDepartmentByIdFromDb(
      id
    );
    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull delete academic Department',
      data: result,
    });
  }
);
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
