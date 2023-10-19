import { Model } from 'mongoose';

export type ICategoryFilters = {
  searchTerm?: string;
  title?: string;
  status?: string;
};

export type ICategory = {
  title: string;
  image?: string;
  status?: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
