import { z } from 'zod';

const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({required_error:"title is required"}),
    image: z.string().optional(),
    content: z.string({required_error:"content is required"}),
    comments: z.array(z.string()).optional(),
   
    status: z.string().optional(),
  }),
});
const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string({required_error:"title is required"}).optional(),
    image: z.string().optional(),
    content: z.string({required_error:"content is required"}).optional(),
    comments: z.array(z.string()).optional(),
  
    status: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
