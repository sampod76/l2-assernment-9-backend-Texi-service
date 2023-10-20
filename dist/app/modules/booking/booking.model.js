"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const booking_consent_1 = require("./booking.consent");
// import { format } from 'date-fns';
const bookingSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Service',
    },
    userName: String,
    phoneNumber: {
        type: String,
    },
    note: String,
    address: String,
    authorityNote: String,
    googleMapLink: String,
    bookingDate: Date,
    payment: { type: Boolean, default: false },
    time: String,
    bookingTickets: {
        type: Number,
    },
    totalBalance: Number,
    status: { type: String, enum: booking_consent_1.BOOKING_STATUS },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
    ratingFeedback: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'RatingFeedBack', // Assuming 'User' is the name of the User model
    },
}, {
    timestamps: true,
    // strict: 'throw',
    toJSON: {
        virtuals: true,
    },
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
