"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqValidation = void 0;
const zod_1 = require("zod");
const createFaqZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title is required" }),
        image: zod_1.z.string().optional(),
        content: zod_1.z.string({ required_error: "content is required" }),
        status: zod_1.z.string().optional(),
    }),
});
const updateFaqZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title is required" }).optional(),
        image: zod_1.z.string().optional(),
        content: zod_1.z.string({ required_error: "content is required" }).optional(),
        status: zod_1.z.string().optional(),
    }),
});
exports.FaqValidation = {
    createFaqZodSchema,
    updateFaqZodSchema,
};
