import express from 'express';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { SuperAdminController } from './superAdmin.controller';
import { SuperAdminValidation } from './superAdmin.validations';
const router = express.Router();

router.route('/').get(SuperAdminController.getAllSuperAdmins);
router
  .route('/:id')
  .get(SuperAdminController.getSingleSuperAdmin)
  .patch(
    validateRequestZod(SuperAdminValidation.updateSuperAdmin),
    SuperAdminController.updateSuperAdmin
  )
  .delete(SuperAdminController.deleteSuperAdmin);

export const AdminRoutes = router;
