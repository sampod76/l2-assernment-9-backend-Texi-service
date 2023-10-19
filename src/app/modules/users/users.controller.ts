import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/users';
import catchAsync from '../../share/catchAsync';
import sendResponse from '../../share/sendResponse';
import { IUser } from './users.interface';
import { UserServices } from './users.service';
// import { IUser } from './users.interface';

const createGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password, ...other } = req.body;
  const userData: { email: string; password: string; role: string } = {
    email,
    password,
    role: ENUM_USER_ROLE.GENERAL_USER,
  };
  const result = await UserServices.createGeneralUserFromdb(other, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});
const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email, password, ...other } = req.body;
  const userData: { email: string; password: string; role: string } = {
    email,
    password,
    role: ENUM_USER_ROLE.SUPER_ADMIN,
  };
  const result = await UserServices.createSuperAdminFromDb(other, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email, password, ...other } = req.body;
  const userData: { email: string; password: string; role: string } = {
    email,
    password,
    role: ENUM_USER_ROLE.ADMIN,
  };
  const result = await UserServices.createAdminFromDb(other, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserByDb(req?.user?._id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

const updateRole = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateRoleByDb(req?.params?.id, req?.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

export const UserController = {
  createGeneralUser,
  createSuperAdmin,
  createAdmin,
  getProfile,
  updateRole,
};
