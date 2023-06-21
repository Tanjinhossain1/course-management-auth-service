import { Request, Response } from 'express';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { sendResponse } from '../../../shareble/sendResponce';
import httpStatus from 'http-status';
import { loginUserService } from './auth.service';

export const loginUserController = clearableAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await loginUserService(loginData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Login Successfully !',
      data: result,
    });
  }
);
