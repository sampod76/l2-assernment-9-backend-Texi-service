'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicDepartmentRoute = void 0;
const express_1 = __importDefault(require('express'));
const validateRequestZod_1 = __importDefault(
  require('../../middlewares/validateRequestZod')
);
const constroller_academicDepartment_1 = require('./constroller.academicDepartment');
const validation_academicDepartment_1 = require('./validation.academicDepartment');
const router = express_1.default.Router();
router
  .route('/')
  .get(
    constroller_academicDepartment_1.AcademicDepartmentController
      .getAllAcademicDepartment
  )
  .post(
    (0, validateRequestZod_1.default)(
      validation_academicDepartment_1.AcademicDepartmentValidation
        .createAcademicDepartmentZodSchema
    ),
    constroller_academicDepartment_1.AcademicDepartmentController
      .createAcademicDepartment
  );
router
  .route('/:id')
  .get(
    constroller_academicDepartment_1.AcademicDepartmentController
      .getSingleAcademicDepartment
  )
  .patch(
    (0, validateRequestZod_1.default)(
      validation_academicDepartment_1.AcademicDepartmentValidation
        .updateAcademicDepartmentZodSchema
    ),
    constroller_academicDepartment_1.AcademicDepartmentController
      .updateAcademicDepartment
  )
  .delete(
    constroller_academicDepartment_1.AcademicDepartmentController
      .deleteAcademicDepartment
  );
exports.AcademicDepartmentRoute = router;
