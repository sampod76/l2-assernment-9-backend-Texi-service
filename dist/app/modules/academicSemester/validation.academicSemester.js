'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require('zod');
const consent_academicSemester_1 = require('./consent.academicSemester');
const createAcademicSemesterZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum(
      [...consent_academicSemester_1.ACADEMIC_SEMESTER_TITLE],
      {
        required_error: 'Title is required',
      }
    ),
    year: zod_1.z.string({
      required_error: 'year is required',
    }),
    code: zod_1.z.enum([...consent_academicSemester_1.ACADEMIC_SEMESTER_CODE], {
      required_error: 'code is required',
    }),
    startMonth: zod_1.z.enum(
      [...consent_academicSemester_1.ACADEMIC_SEMESTER_MONTH],
      {
        required_error: 'start month is required',
      }
    ),
    endMonth: zod_1.z.enum(
      [...consent_academicSemester_1.ACADEMIC_SEMESTER_MONTH],
      {
        required_error: 'end month is required',
      }
    ),
  }),
});
const updateAcademicSemesterZodSchema = zod_1.z
  .object({
    body: zod_1.z.object({
      title: zod_1.z
        .enum([...consent_academicSemester_1.ACADEMIC_SEMESTER_TITLE], {
          required_error: 'Title is required',
        })
        .optional(),
      year: zod_1.z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: zod_1.z
        .enum([...consent_academicSemester_1.ACADEMIC_SEMESTER_CODE], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: zod_1.z
        .enum([...consent_academicSemester_1.ACADEMIC_SEMESTER_MONTH], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: zod_1.z
        .enum([...consent_academicSemester_1.ACADEMIC_SEMESTER_MONTH], {
          required_error: 'end month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );
exports.AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
