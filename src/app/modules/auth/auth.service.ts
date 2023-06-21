/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserModel } from '../users/user.model';
import { ILoginUserType } from './auth.interface';

export const loginUserService = async (user: ILoginUserType) => {
  const { id, password } = user;

  const isUserExist = await UserModel.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1 }
  );

  console.log('first', password, isUserExist);
};
