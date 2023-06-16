import { Model, Types } from 'mongoose';
import { IStudentType } from '../student/student.interface';

export type IUserType = {
  id: string;
  password: string;
  role: string;

  student?: Types.ObjectId | IStudentType;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
  // faculty?: Types.ObjectId | IUserFaculty;
  // admin?: Types.ObjectId | IUserAdmin;
  // createdDate
  // updateDate
  // studentId || adminId || facultyId
};

export type UserModelMethod = Model<IUserType, Record<string, unknown>>;
