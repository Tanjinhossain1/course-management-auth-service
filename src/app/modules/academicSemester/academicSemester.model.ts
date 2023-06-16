import mongoose, { Schema } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemesterType,
} from './academicSemester.interface';
import { codeEnum, monthsEnum, titleEnum } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemesterType>(
  {
    title: { type: String, required: true, enum: titleEnum },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: codeEnum },
    startMonth: { type: String, required: true, enum: monthsEnum },
    endMonth: { type: String, required: true, enum: monthsEnum },
  },
  {
    timestamps: true,
  }
);

// same year and same value not added second type in this pre method
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await academicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'This Academic Semester Already Exist '
    );
  }
  next();
});

export const academicSemester = mongoose.model<
  IAcademicSemesterType,
  AcademicSemesterModel
>('AcademicSemester', academicSemesterSchema);
