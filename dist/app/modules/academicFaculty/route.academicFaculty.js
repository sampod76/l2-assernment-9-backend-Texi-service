'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFacultyRoute = void 0;
const express_1 = __importDefault(require('express'));
const validateRequestZod_1 = __importDefault(
  require('../../middlewares/validateRequestZod')
);
const constroller_academicFaculty_1 = require('./constroller.academicFaculty');
const validation_academicFaculty_1 = require('./validation.academicFaculty');
const router = express_1.default.Router();
router
  .route('/')
  .get(
    constroller_academicFaculty_1.AcademicFacultyController
      .getAllAcademicFaculty
  )
  .post(
    (0, validateRequestZod_1.default)(
      validation_academicFaculty_1.AcademicFacultyValidation
        .createAcademicFacultyZodSchema
    ),
    constroller_academicFaculty_1.AcademicFacultyController
      .createAcademicFaculty
  );
router
  .route('/:id')
  .get(
    constroller_academicFaculty_1.AcademicFacultyController
      .getSingleAcademicFaculty
  )
  .patch(
    (0, validateRequestZod_1.default)(
      validation_academicFaculty_1.AcademicFacultyValidation
        .updateAcademicFacultyZodSchema
    ),
    constroller_academicFaculty_1.AcademicFacultyController
      .updateAcademicFaculty
  )
  .delete(
    constroller_academicFaculty_1.AcademicFacultyController
      .deleteAcademicFaculty
  );
exports.AcademicFacultyRoute = router;
