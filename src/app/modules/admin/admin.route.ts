import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import validateRequestZod from '../../middlewares/validateRequestZod';
const router = express.Router();

router.route('/').get(AdminController.getAllAdmins);
router
  .route('/:id')
  .get(AdminController.getSingleAdmin)
  .patch(
    validateRequestZod(AdminValidation.updateAdmin),
    AdminController.updateAdmin
  )
  .delete(AdminController.deleteAdmin);

export const AdminRoutes = router;
