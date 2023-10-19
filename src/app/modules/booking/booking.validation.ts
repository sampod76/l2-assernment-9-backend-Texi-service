import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    service: z.string({ required_error: 'Service is required' }),
    userName: z.string().optional(),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    note: z.string().optional(),
    address: z.string(),
    googleMapLink: z.string().optional(),
    bookingDate: z.string({ required_error: 'Booking date is required' }),
    time: z.string({ required_error: 'Booking date is required' }).optional(),
    bookingTickets: z.number({ required_error: 'Booking tickets is required' }),
    totalBalance:z.number({ required_error: 'Total balance is required'}).optional(),
    status: z.string().optional(),
    payment: z.string().optional(),
    authorityNote: z.string().optional(),
    user: z.string().optional(),
  }),
});

const updateBookingZodSchema = z.object({
  body: z.object({
    service: z.string({ required_error: 'Service is required' }).optional(),
    userName: z.string().optional(),
    phoneNumber: z.string({ required_error: 'Phone number is required' }).optional(),
    note: z.string().optional(),
    address: z.string().optional(),
    googleMapLink: z.string().optional(),
    bookingDate: z.string({ required_error: 'Booking date is required' }).optional(),
    time: z.string({ required_error: 'Booking date is required' }).optional(),
    bookingTickets: z.number({ required_error: 'Booking tickets is required' }).optional(),
    totalBalance:z.number({ required_error: 'Total balance is required'}).optional(),
    status: z.string().optional(),
    payment: z.boolean().optional(),
    authorityNote: z.string().optional(),
    user: z.string().optional(),
    ratingFeedback: z.string().optional(),
  }),
});
export const BookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
