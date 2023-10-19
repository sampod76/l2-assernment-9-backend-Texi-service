import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { BlogController } from './constroller.faq';
import { BlogValidation } from './validation.faq';

const router = express.Router();

router
  .route('/')
  // This route is open
  .get(BlogController.getAllBlog)
  .post(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequestZod(BlogValidation.createBlogZodSchema),
    BlogController.createBlog
  );

router
  .route('/:id')
  // This route is open
  .get(BlogController.getSingleBlog)
  .patch(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequestZod(BlogValidation.updateBlogZodSchema),
    BlogController.updateBlog
  )
  .delete(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
    BlogController.deleteBlog
  );

export const BlogRoute = router;
