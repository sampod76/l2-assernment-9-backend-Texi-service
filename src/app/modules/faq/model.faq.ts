import { Schema, model } from 'mongoose';
import { FaqModel, IFaq } from './interface.faq';

const FaqSchema = new Schema<IFaq, FaqModel>(
  {
    title: {
      type: String,
    },
    image: String,
    content: {
      type: String,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

export const Faq = model<IFaq, FaqModel>(
  'Faq',
  FaqSchema
);
