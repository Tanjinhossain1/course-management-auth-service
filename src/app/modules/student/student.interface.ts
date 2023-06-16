import { Model, Types } from 'mongoose';
import { IAcademicFacultyType } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepartmentType } from '../academicDepartment/academicDepartment.interface';
import { IAcademicSemesterType } from '../academicSemester/academicSemester.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudentType = {
  id: string;
  name: UserName; //embedded object
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian; // embedded object
  localGuardian: LocalGuardian; // embedded object
  academicFaculty: Types.ObjectId | IAcademicFacultyType; // reference _id
  academicDepartment: Types.ObjectId | IAcademicDepartmentType; // // reference _id
  academicSemester: Types.ObjectId | IAcademicSemesterType; // reference _id
  profileImage?: string;
};

export type IStudentModelType = Model<IStudentType, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
