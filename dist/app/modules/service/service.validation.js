"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesValidation = void 0;
const zod_1 = require("zod");
const service_consent_1 = require("./service.consent");
const createServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is Required ' }),
        description: zod_1.z.string({ required_error: 'description is Required ' }),
        price: zod_1.z.number({ required_error: 'price is Required ' }),
        address: zod_1.z.string({ required_error: 'address is Required ' }).optional(),
        contact: zod_1.z.string({ required_error: 'contact is Required ' }),
        image: zod_1.z.string({ required_error: 'img is Required ' }),
        availableTickets: zod_1.z.number({ required_error: 'availableTickets is Required' }),
        serviceDate: zod_1.z.string({ required_error: 'serviceTime is Required ' }),
        category: zod_1.z.string({ required_error: 'categoryId is Required ' }),
        status: zod_1.z.enum([...service_consent_1.SERVICE_STATUS]).optional(),
        publisher: zod_1.z.string({ required_error: 'publisherId is Required ' }).optional(),
    }),
});
const updateServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is Required ' }).optional(),
        description: zod_1.z.string({ required_error: 'description is Required ' }).optional(),
        price: zod_1.z.number({ required_error: 'price is Required ' }).optional(),
        address: zod_1.z.string({ required_error: 'address is Required ' }).optional(),
        contact: zod_1.z.string({ required_error: 'contact is Required ' }).optional(),
        image: zod_1.z.string({ required_error: 'img is Required ' }).optional(),
        serviceTime: zod_1.z.string({ required_error: 'serviceTime is Required ' }).optional(),
        availableTickets: zod_1.z.number({ required_error: 'availableTickets is Required ' }).optional(),
        category: zod_1.z.string({ required_error: 'categoryId is Required ' }).optional(),
        status: zod_1.z.enum([...service_consent_1.SERVICE_STATUS]).optional(),
        publisher: zod_1.z.string({ required_error: 'publisherId is Required ' }).optional(),
    }),
});
exports.ServicesValidation = { createServiceZodSchema, updateServiceZodSchema };
