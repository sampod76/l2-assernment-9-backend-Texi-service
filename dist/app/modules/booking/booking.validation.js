"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string({ required_error: 'Service is required' }),
        userName: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string({ required_error: 'Phone number is required' }),
        note: zod_1.z.string().optional(),
        address: zod_1.z.string(),
        googleMapLink: zod_1.z.string().optional(),
        bookingDate: zod_1.z.string({ required_error: 'Booking date is required' }),
        time: zod_1.z.string({ required_error: 'Booking date is required' }).optional(),
        bookingTickets: zod_1.z.number({ required_error: 'Booking tickets is required' }),
        totalBalance: zod_1.z.number({ required_error: 'Total balance is required' }).optional(),
        status: zod_1.z.string().optional(),
        payment: zod_1.z.string().optional(),
        authorityNote: zod_1.z.string().optional(),
        user: zod_1.z.string().optional(),
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string({ required_error: 'Service is required' }).optional(),
        userName: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string({ required_error: 'Phone number is required' }).optional(),
        note: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        googleMapLink: zod_1.z.string().optional(),
        bookingDate: zod_1.z.string({ required_error: 'Booking date is required' }).optional(),
        time: zod_1.z.string({ required_error: 'Booking date is required' }).optional(),
        bookingTickets: zod_1.z.number({ required_error: 'Booking tickets is required' }).optional(),
        totalBalance: zod_1.z.number({ required_error: 'Total balance is required' }).optional(),
        status: zod_1.z.string().optional(),
        payment: zod_1.z.boolean().optional(),
        authorityNote: zod_1.z.string().optional(),
        user: zod_1.z.string().optional(),
        ratingFeedback: zod_1.z.string().optional(),
    }),
});
exports.BookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema,
};
