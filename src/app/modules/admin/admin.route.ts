import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.route('/').get(AdminController.getAllAdmins);
router
  .route('/:id')
  .get(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN,),
    AdminController.getSingleAdmin
  )
  .patch(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequestZod(AdminValidation.updateAdmin),
    AdminController.updateAdmin
  )
  .delete(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN, ),
    AdminController.deleteAdmin
  );

export const AdminRoutes = router;
