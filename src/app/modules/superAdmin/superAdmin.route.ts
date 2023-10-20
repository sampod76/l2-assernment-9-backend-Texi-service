import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { SuperAdminController } from './superAdmin.controller';
import { SuperAdminValidation } from './superAdmin.validations';
const router = express.Router();

router.route('/').get(SuperAdminController.getAllSuperAdmins);
router
  .route('/:id')
  .get(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN),
    SuperAdminController.getSingleSuperAdmin
  )
  .patch(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequestZod(SuperAdminValidation.updateSuperAdmin),
    SuperAdminController.updateSuperAdmin
  )
  .delete(
    authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN),
    SuperAdminController.deleteSuperAdmin
  );

export const SuperAdminRoutes = router;
