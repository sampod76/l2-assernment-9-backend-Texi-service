import { z } from 'zod';
import { USER_ROLE } from './user.constant';

const createGeneralUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string({ required_error: 'Password is required' }),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).email(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
    status: z.enum(['active', 'deactive']).optional(),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string({ required_error: 'Password is required' }),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).email(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
    status: z.enum(['active', 'deactive']).optional(),
  }),
});
const createSuperAdminZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string({ required_error: 'Password is required' }),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).email(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
    status: z.enum(['active', 'deactive']).optional(),
  }),
});

const updateRole = z.object({
  body: z.object({
    role: z.enum([...USER_ROLE] as [string, ...string[]]).optional(),
  }),
});

export const UserValidation = {
  createSuperAdminZodSchema,
  createGeneralUserZodSchema,
  createAdminZodSchema,
  updateRole,
};
