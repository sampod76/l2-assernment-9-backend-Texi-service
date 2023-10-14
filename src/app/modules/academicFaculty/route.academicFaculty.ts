import express from 'express';
import validateRequestZod from '../../middlewares/validateRequestZod';
import { AcademicFacultyController } from './constroller.academicFaculty';
import { AcademicFacultyValidation } from './validation.academicFaculty';
import authMiddleware from '../../middlewares/authMiddleware';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router
  .route('/')
  .get(AcademicFacultyController.getAllAcademicFaculty)
  .post(
    validateRequestZod(
      AcademicFacultyValidation.createAcademicFacultyZodSchema
    ),
    authMiddleware(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    AcademicFacultyController.createAcademicFaculty
  );

router
  .route('/:id')
  .get(
    authMiddleware(
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.STUDENT,
      ENUM_USER_ROLE.FACULTY
    ),
    AcademicFacultyController.getSingleAcademicFaculty
  )
  .patch(
    validateRequestZod(
      AcademicFacultyValidation.updateAcademicFacultyZodSchema
    ),
    authMiddleware(
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.FACULTY
    ),
    AcademicFacultyController.updateAcademicFaculty
  )
  .delete(
    authMiddleware(
      ENUM_USER_ROLE.SUPER_ADMIN,
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.FACULTY
    ),
    AcademicFacultyController.deleteAcademicFaculty
  );

export const AcademicFacultyRoute = router;
