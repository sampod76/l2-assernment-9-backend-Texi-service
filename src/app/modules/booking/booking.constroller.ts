import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';
import { BOOKING_FILTERABLE_FIELDS } from './booking.consent';
import { IBooking } from './booking.interface';
import { TravelBooking } from './booking.service';

// import { z } from 'zod'
const createBooking = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.user) {
    req.body.user = req?.user?._id;
  }
  const result = await TravelBooking.createBookingByDb(req.body);

  sendResponse<IBooking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull create academic Booking',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  //****************search and filter start******* */
  // console.log(req.query);
  let queryObject = req.query;
  queryObject = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(queryObject).filter(([_, value]) => Boolean(value))
  );
  const filters = pick(queryObject, BOOKING_FILTERABLE_FIELDS);

  //****************pagination start************ */

  const paginationOptions = pick(queryObject, PAGINATION_FIELDS);

  const result = await TravelBooking.getAllBookingFromDb(
    filters,
    paginationOptions
  );

  sendResponse<IBooking[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull Get academic Booking',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TravelBooking.getSingleBookingFromDb(id);
  sendResponse<IBooking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull get academic Booking',
    data: result,
  });
});
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await TravelBooking.updateBookingFromDb(id, updateData);

  sendResponse<IBooking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull update academic Booking',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TravelBooking.deleteBookingByIdFromDb(id);
  sendResponse<IBooking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull delete academic Booking',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
