import { Model } from 'mongoose';
import { IUser } from '../users/users.interface';

export type IFaqFilters = {
  searchTerm?: string;
  title?: string;
  status?: string;
};

export type IFaq = {
  title: string;
  image?: string;
  content: string;

  author: IUser;
  status?: string;
};

export type FaqModel = Model<IFaq, Record<string, unknown>>;
