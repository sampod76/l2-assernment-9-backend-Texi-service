import { Schema, model } from 'mongoose';
import { GeneralUserModel, IGeneralUser } from './generalUser.interface';

const GeneralUserSchema = new Schema<IGeneralUser, GeneralUserModel>(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export const GeneralUser = model<IGeneralUser, GeneralUserModel>('GeneralUser', GeneralUserSchema);
