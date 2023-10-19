import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { RatingFeedBackController } from './constroller.ratingFeedback';
import { RatingFeedbackValidation } from './validation.ratingFeedback';

const router = express.Router();

router
  .route('/')
  // This route is open
  .get(RatingFeedBackController.getAllRatingFeedBack)
  .post(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.GENERAL_USER),
    validateRequestZod(RatingFeedbackValidation.createRatingFeedbackZodSchema),
    RatingFeedBackController.createRatingFeedBack
  );

router
  .route('/:id')
  // This route is open
  .get(RatingFeedBackController.getSingleRatingFeedBack)
  .patch(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.GENERAL_USER),
    validateRequestZod(RatingFeedbackValidation.updateRatingFeedbackZodSchema),
    RatingFeedBackController.updateRatingFeedBack
  )
  .delete(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.GENERAL_USER),
    RatingFeedBackController.deleteRatingFeedBack
  );

export const RatingFeedBackRoute = router;
