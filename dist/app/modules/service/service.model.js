"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
// import { format } from 'date-fns';
const serviceSchema = new mongoose_1.Schema({
    title: { type: String, },
    price: { type: Number, },
    image: { type: String, },
    description: { type: String, },
    address: { type: String, },
    contact: { type: String, },
    publisher: { type: String, ref: 'User' },
    availableTickets: { type: Number, },
    serviceDate: { type: String, },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', },
    status: { type: String, },
}, {
    timestamps: true,
    // strict: 'throw',
    toJSON: {
        virtuals: true,
    },
});
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
