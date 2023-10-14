import { z } from 'zod';
import {
  ACADEMIC_SEMESTER_CODE,
  ACADEMIC_SEMESTER_MONTH,
  ACADEMIC_SEMESTER_TITLE,
} from './consent.academicSemester';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...ACADEMIC_SEMESTER_TITLE] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'year is required',
    }),
    code: z.enum([...ACADEMIC_SEMESTER_CODE] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...ACADEMIC_SEMESTER_MONTH] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...ACADEMIC_SEMESTER_MONTH] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...ACADEMIC_SEMESTER_TITLE] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...ACADEMIC_SEMESTER_CODE] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...ACADEMIC_SEMESTER_MONTH] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...ACADEMIC_SEMESTER_MONTH] as [string, ...string[]], {
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

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
