import express from 'express';
import { GeneralUserController } from './generalUser.controller';
import { GeneralUserValidation } from './generalUser.validation';
import validateRequestZod from '../../middlewares/validateRequestZod';
const router = express.Router();

router.route('/').get(GeneralUserController.getAllGeneralUsers);
router
  .route('/:id')
  .get(GeneralUserController.getSingleGeneralUser)
  .patch(
    validateRequestZod(GeneralUserValidation.updateGeneralUser),
    GeneralUserController.updateGeneralUser
  )
  .delete(GeneralUserController.deleteGeneralUser);

export const GeneralUserRoutes = router;
