import { Model } from 'mongoose';

export type IAcademicFacultyType = {
  title: string;
};

export type AcademicFacultyModel = Model<IAcademicFacultyType>;

export interface IAcademicFacultyFilterType {
  searchTerm?: string;
}
