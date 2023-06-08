import mongoose, { Schema } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemesterType,
} from './academicSemester.interface';
import { codeEnum, monthsEnum, titleEnum } from './academicSemester.constant';

const academicSemesterSchema = new Schema<IAcademicSemesterType>(
  {
    title: { type: String, required: true, enum: titleEnum },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: codeEnum },
    startMonth: { type: String, required: true, enum: monthsEnum },
    endMonth: { type: String, required: true, enum: monthsEnum },
  },
  {
    timestamps: true,
  }
);

export const academicSemester = mongoose.model<
  IAcademicSemesterType,
  AcademicSemesterModel
>('academicSemester', academicSemesterSchema);
