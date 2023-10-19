import { Schema, model } from 'mongoose';
import { BlogModel, IBlog } from './interface.blog';

const BlogSchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
    },
    image: String,
    content: {
      type: String,
    },
    comments: [String],
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

export const Blog = model<IBlog, BlogModel>(
  'Blog',
  BlogSchema
);
