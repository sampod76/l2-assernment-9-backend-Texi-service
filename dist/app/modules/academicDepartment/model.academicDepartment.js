'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicDepartment = void 0;
const mongoose_1 = require('mongoose');
const academicDepartmentSchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    academicFaculty: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'academic_faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    // strict: 'throw',
    toJSON: {
      virtuals: true,
    },
  }
);
exports.AcademicDepartment = (0, mongoose_1.model)(
  'academic_department',
  academicDepartmentSchema
);
