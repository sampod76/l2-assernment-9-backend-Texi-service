import mongoose, { Schema, model } from 'mongoose';

import { BOOKING_STATUS } from './booking.consent';
import { BookingModel, IBooking } from './booking.interface';
// import { format } from 'date-fns';

const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
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
    payment: {type: Boolean,default: false},
    time:String,
    bookingTickets: {
      type: Number,
    },
    totalBalance:Number,
    status:{type:String,enum:BOOKING_STATUS}, // Assuming IBookingStatusType is an array of strings
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming 'User' is the name of the User model
      required:[true,"User is required"]
    },
    ratingFeedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RatingFeedBack', // Assuming 'User' is the name of the User model
    },
  },
  {
    timestamps: true,
    // strict: 'throw',
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking, BookingModel>('Booking', bookingSchema);
