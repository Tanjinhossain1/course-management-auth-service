import { Request, RequestHandler, Response } from 'express';
import { createStudentService } from './user.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shareble/sendResponce';

export const createStudentController: RequestHandler = clearableAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;

    const result = await createStudentService(student, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Create SuccessFully',
      data: result,
    });
  }
);
