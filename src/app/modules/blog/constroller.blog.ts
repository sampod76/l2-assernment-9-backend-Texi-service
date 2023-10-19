import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constant/pagination';
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
import catchAsync from '../../share/catchAsync';
import pick from '../../share/pick';
import sendResponse from '../../share/sendResponse';

import { BLOG_FILTERABLE_FIELDS } from './consent.blog';
import { IBlog } from './interface.blog';
import { BlogService } from './service.blog';

// import { z } from 'zod'
const createBlog = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req.user?._id;
  const result = await BlogService.createBlogByDb(req.body);

  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull create Blog Blog',
    data: result,
  });
  // next();
  /* res.status(200).send({
      success: true,
      data: result,
      message: 'successfull create Blog Blog',
    }); */
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  //****************search and filter start******* */
  let queryObject = req.query;
  queryObject = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(queryObject).filter(([_, value]) => Boolean(value))
  );
  const filters = pick(queryObject, BLOG_FILTERABLE_FIELDS);

  //****************pagination start************ */

  const paginationOptions = pick(queryObject, PAGINATION_FIELDS);

  const result = await BlogService.getAllBlogFromDb(filters, paginationOptions);

  sendResponse<IBlog[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull Get Blog Blog',
    meta: result.meta,
    data: result.data,
  });
  // next();
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

  const result = await BlogService.getSingleBlogFromDb(id);

  /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull get Blog Blog',
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */

  const result = await BlogService.updateBlogFromDb(id, updateData);

  /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull update Blog Blog',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogByIdFromDb(id);
  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfull delete Blog Blog',
    data: result,
  });
});
export const BlogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
