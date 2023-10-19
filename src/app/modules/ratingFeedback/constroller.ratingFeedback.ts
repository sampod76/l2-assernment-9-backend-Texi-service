import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';

import { RATING_FILTERABLE_FIELDS } from './consent.ratingFeedback';
import { IRatingFeedBack } from './interface.ratingFeedback';
import { RatingFeedBackService } from './service.ratingFeedback';

// import { z } from 'zod'
const createRatingFeedBack = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req?.user?._id;
  const result = await RatingFeedBackService.createRatingFeedBackByDb(req.body);

  sendResponse<IRatingFeedBack>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull create RatingFeedBack RatingFeedBack',
    data: result,
  });
  // next();
  /* res.status(200).send({
      success: true,
      data: result,
      message: 'successfull create RatingFeedBack RatingFeedBack',
    }); */
});

const getAllRatingFeedBack = catchAsync(async (req: Request, res: Response) => {
  //****************search and filter start******* */
  let queryObject = req.query;
  queryObject = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(queryObject).filter(([_, value]) => Boolean(value))
  );
  const filters = pick(queryObject, RATING_FILTERABLE_FIELDS);

  //****************pagination start************ */

  const paginationOptions = pick(queryObject, PAGINATION_FIELDS);

  const result = await RatingFeedBackService.getAllRatingFeedBackFromDb(
    filters,
    paginationOptions
  );

  sendResponse<IRatingFeedBack[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull Get RatingFeedBack RatingFeedBack',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingleRatingFeedBack = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

    const result = await RatingFeedBackService.getSingleRatingFeedBackFromDb(
      id
    );

    /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
    sendResponse<IRatingFeedBack>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'successfull get RatingFeedBack RatingFeedBack',
      data: result,
    });
  }
);
const updateRatingFeedBack = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

  const result = await RatingFeedBackService.updateRatingFeedBackFromDb(
    id,
    updateData
  );

  /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
  sendResponse<IRatingFeedBack>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull update RatingFeedBack RatingFeedBack',
    data: result,
  });
});

const deleteRatingFeedBack = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RatingFeedBackService.deleteRatingFeedBackByIdFromDb(id);
  sendResponse<IRatingFeedBack>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull delete RatingFeedBack RatingFeedBack',
    data: result,
  });
});
export const RatingFeedBackController = {
  createRatingFeedBack,
  getAllRatingFeedBack,
  getSingleRatingFeedBack,
  updateRatingFeedBack,
  deleteRatingFeedBack,
};
