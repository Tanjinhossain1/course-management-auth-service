import mongoose, { Schema } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFacultyType,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFacultyType>(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const academicFaculty = mongoose.model<
  IAcademicFacultyType,
  AcademicFacultyModel
>('academicFaculty', academicFacultySchema);
