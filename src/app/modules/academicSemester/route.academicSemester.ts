import express from 'express';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { AcademicSemesterController } from './constroller.academicSemester';
import { AcademicSemesterValidation } from './validation.academicSemester';

const router = express.Router();

router
  .route('/')
  .get(AcademicSemesterController.getAllAcademicSemester)
  .post(
    validateRequestZod(
      AcademicSemesterValidation.createAcademicSemesterZodSchema
    ),
    AcademicSemesterController.createAcademicSemester
  );

router
  .route('/:id')
  .get(AcademicSemesterController.getSingleAcademicSemester)
  .patch(
    validateRequestZod(
      AcademicSemesterValidation.updateAcademicSemesterZodSchema
    ),
    AcademicSemesterController.updateAcademicSemester
  )
  .delete(AcademicSemesterController.deleteAcademicSemester);

export const AcademicSemesterRoute = router;
