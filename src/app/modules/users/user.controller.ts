import { Request, RequestHandler, Response } from 'express';
import {
  createStudentService,
  createFacultyService,
  createAdminService,
} from './user.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shareble/sendResponce';
import { IUserType } from './user.interface';

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

export const createFacultyController: RequestHandler = clearableAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await createFacultyService(faculty, userData);

    sendResponse<IUserType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

export const createAdminController: RequestHandler = clearableAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await createAdminService(admin, userData);

    sendResponse<IUserType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);
