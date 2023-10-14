import { Model } from 'mongoose';

export type IAcademicFacultyFilters = {
  searchTerm?: string;
  title?: string;
};

export type IAcademicFaculty = {
  title: string;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
