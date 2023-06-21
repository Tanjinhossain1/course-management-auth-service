import { Model, Types } from 'mongoose';
import { IStudentType } from '../student/student.interface';

export type IUserType = {
  id: string;
  password: string;
  role: string;

  needPasswordChange: true | false;
  student?: Types.ObjectId | IStudentType;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

export type UserModelMethod = Model<IUserType, Record<string, unknown>>;
