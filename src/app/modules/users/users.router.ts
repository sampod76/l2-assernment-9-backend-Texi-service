import express from 'express';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { UserController } from './users.controller';
import { UserValidation } from './users.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { ENUM_USER_ROLE } from '../../../enums/users';

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
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequestZod(UserValidation.createAdminZodSchema),
    UserController.createAdmin
  );

router
  .route('/create-super-admin')
  .post(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequestZod(UserValidation.createSuperAdminZodSchema),
    UserController.createSuperAdmin
  );

router
  .route('/profile')
  .get(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.GENERAL_USER,),
    UserController.getProfile
  )
router
  .route('/update-role/:id')
  .patch(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequestZod(UserValidation.updateRole),
    UserController.updateRole
  )
  // .patch(authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.GENERAL_USER,),
  // UserController.updateProfile
  // ,);



export const UserRoute = router;
