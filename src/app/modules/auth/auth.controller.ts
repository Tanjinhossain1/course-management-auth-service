import { Request, Response } from 'express';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { sendResponse } from '../../../shareble/sendResponce';
import httpStatus from 'http-status';
import { loginUserService, refreshTokenService } from './auth.service';
import config from '../../../config';
import {
  ILoginUserResponseType,
  IRefreshTokenResponseType,
} from './auth.interface';

export const loginUserController = clearableAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await loginUserService(loginData);

    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponseType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Login Successfully !',
      data: others,
    });
  }
);
export const createRefreshTokenController = clearableAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await refreshTokenService(refreshToken);

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponseType>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: result,
    });
  }
);
