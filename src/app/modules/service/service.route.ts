import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/users';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { ServiceController } from './service.constroller';
import { ServicesValidation } from './service.validation';

const router = express.Router();

router
  .route('/')
  .get(ServiceController.getAllService)
  .post(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,),
    validateRequestZod(ServicesValidation.createServiceZodSchema),
    ServiceController.createService
  );



router
  .route('/:id')
  .get(ServiceController.getSingleService)
  .patch(
    authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,),
    validateRequestZod(ServicesValidation.updateServiceZodSchema),
    ServiceController.updateService
  )
  .delete(authMiddleware(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN,), ServiceController.deleteService);

export const ServiceRoute = router;
