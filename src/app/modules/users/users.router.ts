import express from 'express';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { UserController } from './users.controller';
import { UserValidation } from './users.validation';

const router = express.Router();

router
  .route('/create-general-user')
  .post(
    validateRequestZod(UserValidation.createGeneralUserZodSchema),
    UserController.createGeneralUser
  );

router
  .route('/create-admin')
  .post(
    validateRequestZod(UserValidation.createAdminZodSchema),
    UserController.createAdmin
  );
router
  .route('/create-super-admin')
  .post(
    validateRequestZod(UserValidation.createSuperAdminZodSchema),
    UserController.createSuperAdmin
  );



export const UserRoute = router;
