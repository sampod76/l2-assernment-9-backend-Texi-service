import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/interface.academicFaculty';

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  title?: string;
};

export type IAcademicDepartment = {
  title: string;
  //এখানে মূলত academicFaculty এর আইডি হবে অথবা সে নিজে পুরোটা হবে
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
