import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';
import { SERVICE_FILTERABLE_FIELDS } from './service.consent';
import { IService } from './service.interface';
import { TravelService } from './service.service';

// import { z } from 'zod'
const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...ServiceData } = req.body;

  const result = await TravelService.createServiceByDb(ServiceData);

  sendResponse<IService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull create academic Service',
    data: result,
  });
});

const getAllService = catchAsync(async (req: Request, res: Response) => {
  //****************search and filter start******* */
  // console.log(req.query);
  let queryObject = req.query;
  queryObject = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(queryObject).filter(([_, value]) => Boolean(value))
  );
  const filters = pick(queryObject, SERVICE_FILTERABLE_FIELDS);

  //****************pagination start************ */

  const paginationOptions = pick(queryObject, PAGINATION_FIELDS);

  const result = await TravelService.getAllServiceFromDb(
    filters,
    paginationOptions
  );

  sendResponse<IService[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull Get academic Service',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TravelService.getSingleServiceFromDb(id);
  sendResponse<IService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull get academic Service',
    data: result,
  });
});
const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await TravelService.updateServiceFromDb(id, updateData);

  sendResponse<IService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull update academic Service',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TravelService.deleteServiceByIdFromDb(id);
  sendResponse<IService>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull delete academic Service',
    data: result,
  });
});


export const ServiceController = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,

};
