'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterRoute = void 0;
const express_1 = __importDefault(require('express'));
const validateRequestZod_1 = __importDefault(
  require('../../middlewares/validateRequestZod')
);
const constroller_academicSemester_1 = require('./constroller.academicSemester');
const validation_academicSemester_1 = require('./validation.academicSemester');
const router = express_1.default.Router();
router
  .route('/')
  .get(
    constroller_academicSemester_1.AcademicSemesterController
      .getAllAcademicSemester
  )
  .post(
    (0, validateRequestZod_1.default)(
      validation_academicSemester_1.AcademicSemesterValidation
        .createAcademicSemesterZodSchema
    ),
    constroller_academicSemester_1.AcademicSemesterController
      .createAcademicSemester
  );
router
  .route('/:id')
  .get(
    constroller_academicSemester_1.AcademicSemesterController
      .getSingleAcademicSemester
  )
  .patch(
    (0, validateRequestZod_1.default)(
      validation_academicSemester_1.AcademicSemesterValidation
        .updateAcademicSemesterZodSchema
    ),
    constroller_academicSemester_1.AcademicSemesterController
      .updateAcademicSemester
  )
  .delete(
    constroller_academicSemester_1.AcademicSemesterController
      .deleteAcademicSemester
  );
exports.AcademicSemesterRoute = router;
