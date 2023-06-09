/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import { UserModel } from '../users/user.model';
import {
  ILoginUserResponseType,
  ILoginUserType,
  IPasswordChangeType,
  IRefreshTokenResponseType,
} from './auth.interface';
import ApiError from '../../../errors/ApiError';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { createToken, verifyToken } from '../../../helper/createJwtToken';
import bcrypt from 'bcrypt';

export const loginUserService = async (
  user: ILoginUserType
): Promise<ILoginUserResponseType> => {
  const { id, password } = user;

  const isUserExist = await UserModel.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist !');
  }

  if (
    isUserExist.password &&
    !UserModel.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Is Incorrect !');
  }
  const { id: userId, role, needPasswordChange } = isUserExist;

  const accessToken = createToken(
    { userId, role },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.jwt_expires_in as string
  );

  const refreshToken = createToken(
    { userId, role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

export const refreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponseType> => {
  let verifiedToken = null;
  try {
    // verifiedToken = jwt.verify(token, config.jwt.jwt_refresh_secret as Secret);
    verifiedToken = verifyToken(token, config.jwt.jwt_refresh_secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken as JwtPayload;

  const isUserExist = await UserModel.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.jwt_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const changePasswordService = async (
  userDetail: JwtPayload | null,
  passwordDetail: IPasswordChangeType
): Promise<void> => {
  const { oldPassword, newPassword } = passwordDetail;
  const isUserExist = await UserModel.isUserExist(userDetail?.userId);
  console.log('first ', userDetail, passwordDetail, isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist !');
  }

  if (
    isUserExist.password &&
    (await UserModel.isPasswordMatched(oldPassword, isUserExist?.password)) ===
      false
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password Is Incorrect !');
  }

  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const updatedPassword = {
    password: newHashPassword,
    needPasswordChange: false,
    passwordChangeAt: new Date(),
  };

  await UserModel.findOneAndUpdate({ id: userDetail?.userId }, updatedPassword);
};
