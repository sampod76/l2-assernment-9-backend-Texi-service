import { z } from 'zod';

const createRatingFeedbackZodSchema = z.object({
  body: z.object({
    feedback: z.string().optional(),
    rating: z.number({required_error:'rating is required'}),
    booking: z.string({required_error:"booking is required"}),
  }),
});
const updateRatingFeedbackZodSchema = z.object({
  body: z.object({
    feedback: z.string().optional(),
    image: z.string().optional(),
    booking: z.string().optional(),
  }),
});

export const RatingFeedbackValidation = {
  createRatingFeedbackZodSchema,
  updateRatingFeedbackZodSchema,
};
