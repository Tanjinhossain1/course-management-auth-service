import {
  createAcademicSemester,
  getAllSemesterServices,
} from './academicSemester.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../../shareble/sendResponce';
import httpStatus from 'http-status';
import { pick } from '../../../shareble/pick';
import { paginationField } from '../../../constants/pagination';
import { IAcademicSemesterType } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';

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

export const getAllAccountSemestersController = clearableAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOption = pick(req.query, paginationField);

    const result = await getAllSemesterServices(filters, paginationOption);

    sendResponse<IAcademicSemesterType[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Semester ',
      paginated: result?.paginated,
      data: result?.data,
    });
    next();
  }
);
