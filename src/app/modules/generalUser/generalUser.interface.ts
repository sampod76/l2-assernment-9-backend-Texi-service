import { Model } from 'mongoose';


export type IGeneralUser = {
  name: string;
  address?: string;
  gender?: string;
  profileImage?: string;
  dateOfBirth?: string;
  phoneNumber: string;
  email: string;
};

export type GeneralUserModel = Model<IGeneralUser, Record<string, unknown>>;

export type IGeneralUserFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
  
};
