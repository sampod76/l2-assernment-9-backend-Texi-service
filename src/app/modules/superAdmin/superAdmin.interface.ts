import { Model } from 'mongoose';


export type ISuperAdmin = {
  name: string;
  address?: string;
  gender?: string;
  profileImage?: string;
  dateOfBirth?: string;
  phoneNumber: string;
  email: string;
};

export type SuperAdminModel = Model<ISuperAdmin, Record<string, unknown>>;

export type ISuperAdminFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
  
};
