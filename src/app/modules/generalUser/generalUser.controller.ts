import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';
import { generalUserFilterableFields } from './generalUser.constant';
import { IGeneralUser } from './generalUser.interface';
import { GeneralUserService } from './generalUser.service';

const getAllGeneralUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, generalUserFilterableFields);
  const paginationOptions = pick(req.query, PAGINATION_FIELDS);
  const result = await GeneralUserService.getAllGeneralUsers(filters, paginationOptions);

  sendResponse<IGeneralUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'GeneralUsers retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await GeneralUserService.getSingleGeneralUser(id);

  sendResponse<IGeneralUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'GeneralUser retrieved successfully !',
    data: result,
  });
});

const updateGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await GeneralUserService.updateGeneralUser(id, updatedData);
  sendResponse<IGeneralUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'GeneralUser updated successfully !',
    data: result,
  });
});

const deleteGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await GeneralUserService.deleteGeneralUser(id);
  sendResponse<IGeneralUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'GeneralUser deleted successfully !',
    data: result,
  });
});

export const GeneralUserController = {
  getAllGeneralUsers,
  getSingleGeneralUser,
  updateGeneralUser,
  deleteGeneralUser,
};
