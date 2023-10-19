import { z } from 'zod';
import { SERVICE_STATUS } from './service.consent';
const createServiceZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is Required ' }),
    description: z.string({ required_error: 'description is Required ' }),
    price: z.number({ required_error: 'price is Required ' }),
    address: z.string({ required_error: 'address is Required ' }).optional(),
    contact: z.string({ required_error: 'contact is Required ' }),
    image: z.string({ required_error: 'img is Required ' }),
    availableTickets : z.number({ required_error: 'availableTickets is Required'}),
    serviceDate: z.string({ required_error: 'serviceTime is Required ' }),
    category: z.string({ required_error: 'categoryId is Required ' }),
    status:z.enum([...SERVICE_STATUS] as [string, ...string[]]).optional(),
    publisher: z.string({ required_error: 'publisherId is Required ' }).optional(),
  }),
});

const updateServiceZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is Required ' }).optional(),
    description: z.string({ required_error: 'description is Required ' }).optional(),
    price: z.number({ required_error: 'price is Required ' }).optional(),
    address: z.string({ required_error: 'address is Required ' }).optional(),
    contact: z.string({ required_error: 'contact is Required ' }).optional(),
    image: z.string({ required_error: 'img is Required ' }).optional(),
    serviceTime: z.string({ required_error: 'serviceTime is Required ' }).optional(),
    availableTickets :  z.number({ required_error: 'availableTickets is Required ' }).optional(),
    category: z.string({ required_error: 'categoryId is Required ' }).optional(),
    status:z.enum([...SERVICE_STATUS] as [string, ...string[]]).optional(),
    publisher: z.string({ required_error: 'publisherId is Required ' }).optional(),
  }),
});
export const ServicesValidation = { createServiceZodSchema,updateServiceZodSchema };
