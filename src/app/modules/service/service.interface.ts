import { Model } from 'mongoose';

import { ICategory } from '../category/interface.category';
import { IUser } from '../users/users.interface';

export type IServiceFilters = {
  searchTerm?: string;
  status?: string;
  category?: string;
  availableTickets?: string;
  price?: number;
};

export type IService = {
  title: string;
  price: number;//per sit price
  image: string;
  description: string;
  address?: string; // aria
  contact: string;
  availableTickets: number;
  serviceDate: string;
  category: string | ICategory;
  status?: 'available' | 'upcoming' | 'unavailable';
  publisher?: string | IUser;
  // reviews?: {
  //   userId: Types.ObjectId;
  //   star: number;
  //   message?: string;
  // }[];
};

export type ServiceModel = Model<IService, Record<string, unknown>>;
