import { Schema, model } from 'mongoose';

import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './interface.academicDepartment';
const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
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

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('academic_department', academicDepartmentSchema);
