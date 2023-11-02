"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createGeneralUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        gender: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'deactive']).optional(),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        gender: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'deactive']).optional(),
    }),
});
const createSuperAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        gender: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'deactive']).optional(),
    }),
});
const updateRole = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...user_constant_1.USER_ROLE]).optional(),
    }),
});
exports.UserValidation = {
    createSuperAdminZodSchema,
    createGeneralUserZodSchema,
    createAdminZodSchema,
    updateRole,
};
