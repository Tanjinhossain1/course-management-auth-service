/* eslint-disable no-unused-vars */
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

export interface IUserMethod {
  isUserExist(id: string): Promise<Partial<IUserType | null>>;

  isPasswordMatched(
    givePassword: string,
    savePassword: string
  ): Promise<boolean>;
}

export type UserModelMethod = {
  isUserExist(
    id: string
  ): Promise<
    Pick<IUserType, 'id' | 'password' | 'role' | 'needPasswordChange'>
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUserType>;

// export type UserModelMethod = Model<IUserType, Record<string, unknown>, IUserMethod>;
