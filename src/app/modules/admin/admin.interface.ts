import { Model } from 'mongoose';


export type IAdmin = {
  name: string;
  address?: string;
  gender?: string;
  profileImage?: string;
  dateOfBirth?: string;
  phoneNumber: string;
  email: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
  
};
