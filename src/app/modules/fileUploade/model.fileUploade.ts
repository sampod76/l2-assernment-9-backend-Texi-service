import { Schema, model } from 'mongoose';
import { FileUploadeModel, IFileUploade } from './interface.fileUploade';

const FileUploadeSchema = new Schema<IFileUploade, FileUploadeModel>(
  {
    path: {
      type: String,
      trim: true,
    },
    size: {
      type: Number,
      default: 0,
    },
    filename: {
      type: String,
      required: true,
    },
    url: String,
    mimetype: {
      type: String,
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

// s

export const FileUploade = model<IFileUploade, FileUploadeModel>(
  'FileUploade',
  FileUploadeSchema
);
