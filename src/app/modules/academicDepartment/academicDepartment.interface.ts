import { Model, Types } from 'mongoose';
import { IAcademicFacultyType } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepartmentType = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFacultyType;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartmentType,
  Record<string, unknown>
>;

export interface IAcademicDepartmentFilterType {
  searchTerm?: string;
}
