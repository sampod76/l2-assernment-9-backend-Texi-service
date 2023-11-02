"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingFeedbackValidation = void 0;
const zod_1 = require("zod");
const createRatingFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        feedback: zod_1.z.string().optional(),
        rating: zod_1.z.number({ required_error: 'rating is required' }),
        booking: zod_1.z.string({ required_error: "booking is required" }),
    }),
});
const updateRatingFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        feedback: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        booking: zod_1.z.string().optional(),
    }),
});
exports.RatingFeedbackValidation = {
    createRatingFeedbackZodSchema,
    updateRatingFeedbackZodSchema,
};
