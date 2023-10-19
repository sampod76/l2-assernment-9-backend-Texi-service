import mongoose, { Schema, model } from 'mongoose';
import {
  IRatingFeedBack,
  RatingFeedBack,
} from './interface.ratingFeedback';

const ratingFeedBackSchema = new Schema<IRatingFeedBack, RatingFeedBack>(
  {
    feedback: {
      type: String,

      trim: true,
    },
    rating: {
      type: Number,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
    status: {
      type: String,
      default: 'active',
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

export const RatingFeedBackModel = model<IRatingFeedBack, RatingFeedBack>(
  'RatingFeedBack',
  ratingFeedBackSchema
);
