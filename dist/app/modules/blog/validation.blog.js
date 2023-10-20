"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title is required" }),
        image: zod_1.z.string().optional(),
        content: zod_1.z.string({ required_error: "content is required" }),
        comments: zod_1.z.array(zod_1.z.string()).optional(),
        status: zod_1.z.string().optional(),
    }),
});
const updateBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title is required" }).optional(),
        image: zod_1.z.string().optional(),
        content: zod_1.z.string({ required_error: "content is required" }).optional(),
        comments: zod_1.z.array(zod_1.z.string()).optional(),
        status: zod_1.z.string().optional(),
    }),
});
exports.BlogValidation = {
    createBlogZodSchema,
    updateBlogZodSchema,
};
