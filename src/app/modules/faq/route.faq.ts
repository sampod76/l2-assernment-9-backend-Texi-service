import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { FaqController } from './constroller.faq';
import { FaqValidation } from './validation.faq';

const router = express.Router();

router
  .route('/')
  // This route is open
  .get(FaqController.getAllFaq)
  .post(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequestZod(FaqValidation.createFaqZodSchema),
    FaqController.createFaq
  );

router
  .route('/:id')
  // This route is open
  .get(FaqController.getSingleFaq)
  .patch(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequestZod(FaqValidation.updateFaqZodSchema),
    FaqController.updateFaq
  )
  .delete(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
    FaqController.deleteFaq
  );

export const FaqRoute = router;
