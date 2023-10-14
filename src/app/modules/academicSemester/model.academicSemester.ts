import status from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../errors/ApiError';
import {
  ACADEMIC_SEMESTER_CODE,
  ACADEMIC_SEMESTER_MONTH,
  ACADEMIC_SEMESTER_TITLE,
} from './consent.academicSemester';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './interface.academicSemester';
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: {
        values: ACADEMIC_SEMESTER_TITLE,
        message: `{VALUE} is not supported`,
      },
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: {
        values: ACADEMIC_SEMESTER_CODE,
        message: `{VALUE} is not supported`,
      },
    },
    endMonth: {
      type: String,
      required: true,
      enum: {
        values: ACADEMIC_SEMESTER_MONTH,
        message: `{VALUE} is not supported`,
      },
    },
    startMonth: {
      type: String,
      required: true,
      enum: {
        values: ACADEMIC_SEMESTER_MONTH, // [JANUARY,FEBRUARY]
        message: `{VALUE} is not supported`,
      },
    },
  },
  {
    timestamps: true,
    // strict: 'throw',
  }
);

// pre  --> এর অর্থ হচ্ছে  সেভ করার পূর্বে যাচাই-বাছাই করবে (previews)
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist !');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'academic_semester',
  academicSemesterSchema
);
