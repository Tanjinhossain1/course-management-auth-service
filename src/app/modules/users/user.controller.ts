import { Request, RequestHandler, Response } from 'express';
import { createUserService } from './user.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shareble/sendResponce';

export const createUserController: RequestHandler = clearableAsync(
  async (req: Request, res: Response) => {
    // const { user } = req.body;

    const result = await createUserService(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Create SuccessFully',
      data: result,
    });
  }
);
