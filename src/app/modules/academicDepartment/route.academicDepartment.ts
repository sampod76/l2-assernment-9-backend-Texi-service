import express from 'express';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { AcademicDepartmentController } from './constroller.academicDepartment';
import { AcademicDepartmentValidation } from './validation.academicDepartment';

const router = express.Router();

router
  .route('/')
  .get(AcademicDepartmentController.getAllAcademicDepartment)
  .post(
    validateRequestZod(
      AcademicDepartmentValidation.createAcademicDepartmentZodSchema
    ),
    AcademicDepartmentController.createAcademicDepartment
  );

router
  .route('/:id')
  .get(AcademicDepartmentController.getSingleAcademicDepartment)
  .patch(
    validateRequestZod(
      AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
    ),
    AcademicDepartmentController.updateAcademicDepartment
  )
  .delete(AcademicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRoute = router;
