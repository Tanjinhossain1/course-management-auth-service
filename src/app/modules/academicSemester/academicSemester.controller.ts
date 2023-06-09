import { createAcademicSemester } from './academicSemester.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../../shareble/sendResponce';
import httpStatus from 'http-status';

export const createAcademicSemesterController = clearableAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemesterData = req.body;
    const result = await createAcademicSemester(academicSemesterData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Create SuccessFully',
      data: result,
    });
    next();
  }
);
