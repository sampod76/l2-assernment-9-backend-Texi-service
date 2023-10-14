import { z } from 'zod';

const updateGeneralUser = z.object({
  body: z.object({
    name: z.string().optional(),
    // password: z.string({ required_error: 'Password is required' }),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    email: z
      .string()
      .email().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
    status: z.enum(['active', 'deactive']).optional(),
  }),
});

export const GeneralUserValidation = {
  updateGeneralUser,
};
