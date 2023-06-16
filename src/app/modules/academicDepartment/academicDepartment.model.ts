import mongoose, { Schema } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartmentType,
} from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartmentType>(
  {
    title: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const academicDepartment = mongoose.model<
  IAcademicDepartmentType,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
