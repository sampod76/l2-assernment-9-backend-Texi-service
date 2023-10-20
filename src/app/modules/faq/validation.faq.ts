import { z } from 'zod';

const createFaqZodSchema = z.object({
  body: z.object({
    title: z.string({required_error:"title is required"}),
    image: z.string().optional(),
    content: z.string({required_error:"content is required"}),
  
   
    status: z.string().optional(),
  }),
});
const updateFaqZodSchema = z.object({
  body: z.object({
    title: z.string({required_error:"title is required"}).optional(),
    image: z.string().optional(),
    content: z.string({required_error:"content is required"}).optional(),
  
  
    status: z.string().optional(),
  }),
});

export const FaqValidation = {
  createFaqZodSchema,
  updateFaqZodSchema,
};
