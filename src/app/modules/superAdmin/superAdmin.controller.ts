import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';
import { superAdminFilterableFields } from './superAdmin.constant';
import { ISuperAdmin } from './superAdmin.interface';
import { SuperAdminService } from './superAdmin.service';

const getAllSuperAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, superAdminFilterableFields);
  const paginationOptions = pick(req.query, PAGINATION_FIELDS);

  const result = await SuperAdminService.getAllSuperAdmins(filters, paginationOptions);

  sendResponse<ISuperAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmins retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SuperAdminService.getSingleSuperAdmin(id);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin retrieved successfully !',
    data: result,
  });
});

const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await SuperAdminService.updateSuperAdmin(id, updatedData);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin updated successfully !',
    data: result,
  });
});
const deleteSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SuperAdminService.deleteSuperAdmin(id);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin deleted successfully !',
    data: result,
  });
});

export const SuperAdminController = {
  getAllSuperAdmins,
  getSingleSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
