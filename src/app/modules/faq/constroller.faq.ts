import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';

import { FAQ_FILTERABLE_FIELDS } from './consent.faq';
import { IFaq } from './interface.faq';
import { FaqService } from './service.faq';

// import { z } from 'zod'
const createFaq = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req.user?._id;
  const result = await FaqService.createFaqByDb(req.body);

  sendResponse<IFaq>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull create Faq Faq',
    data: result,
  });
  // next();
  /* res.status(200).send({
      success: true,
      data: result,
      message: 'successfull create Faq Faq',
    }); */
});

const getAllFaq = catchAsync(async (req: Request, res: Response) => {
  //****************search and filter start******* */
  let queryObject = req.query;
  queryObject = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(queryObject).filter(([_, value]) => Boolean(value))
  );
  const filters = pick(queryObject, FAQ_FILTERABLE_FIELDS);

  //****************pagination start************ */

  const paginationOptions = pick(queryObject, PAGINATION_FIELDS);

  const result = await FaqService.getAllFaqFromDb(filters, paginationOptions);

  sendResponse<IFaq[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull Get Faq Faq',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingleFaq = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

  const result = await FaqService.getSingleFaqFromDb(id);

  /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
  sendResponse<IFaq>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull get Faq Faq',
    data: result,
  });
});
const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

  const result = await FaqService.updateFaqFromDb(id, updateData);

  /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
  sendResponse<IFaq>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull update Faq Faq',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FaqService.deleteFaqByIdFromDb(id);
  sendResponse<IFaq>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull delete Faq Faq',
    data: result,
  });
});
export const FaqController = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
