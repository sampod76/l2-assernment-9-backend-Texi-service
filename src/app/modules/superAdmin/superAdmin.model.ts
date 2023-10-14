import { Schema, model } from 'mongoose';
import { ISuperAdmin, SuperAdminModel } from './superAdmin.interface';


const SuperAdminSchema = new Schema<ISuperAdmin, SuperAdminModel>(
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

export const SuperAdmin = model<ISuperAdmin, SuperAdminModel>('SuperAdmin', SuperAdminSchema);
