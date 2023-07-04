import { USER_ROLE_ENUM } from '../../../enums/userEnum';

export type ILoginUserType = {
  id: string;
  password: string;
};
export type ILoginUserResponseType = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean | undefined;
};
export type IRefreshTokenResponseType = {
  accessToken: string;
};
export type IVerifiedLoginUserType = {
  userId: string;
  role: USER_ROLE_ENUM;
};
export type IPasswordChangeType = {
  newPassword: string;
  oldPassword: string;
};
