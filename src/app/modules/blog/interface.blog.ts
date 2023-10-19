import { Model } from 'mongoose';
import { IUser } from '../users/users.interface';

export type IBlogFilters = {
  searchTerm?: string;
  title?: string;
  status?: string;
};

export type IBlog = {
  title: string;
  image?: string;
  content: string;
  comments?: string[];
  author: IUser;
  status?: string;
};

export type BlogModel = Model<IBlog, Record<string, unknown>>;
