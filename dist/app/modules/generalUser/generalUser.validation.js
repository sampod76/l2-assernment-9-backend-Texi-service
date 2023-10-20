"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralUserValidation = void 0;
const zod_1 = require("zod");
const updateGeneralUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        // password: z.string({ required_error: 'Password is required' }),
        gender: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z
            .string()
            .email().optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'deactive']).optional(),
    }),
});
exports.GeneralUserValidation = {
    updateGeneralUser,
};
