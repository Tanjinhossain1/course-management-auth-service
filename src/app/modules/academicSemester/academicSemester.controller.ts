import {
  createAcademicSemester,
  getAllSemesterServices,
  getSingleSemesterService,
  updateSingleSemesterService,
  deleteSingleSemesterService,
} from './academicSemester.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { Request, Response } from 'express';
import { sendResponse } from '../../../shareble/sendResponce';
import httpStatus from 'http-status';
import { pick } from '../../../shareble/pick';
import { paginationField } from '../../../constants/pagination';
import { IAcademicSemesterType } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';

export const createAcademicSemesterController = clearableAsync(
  async (req: Request, res: Response) => {
    const academicSemesterData = req.body;
    const result = await createAcademicSemester(academicSemesterData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Create SuccessFully',
      data: result,
    });
  }
);

export const getAllAccountSemestersController = clearableAsync(
  async (req: Request, res: Response) => {
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
  }
);

export const getSingleAccountSemestersController = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await getSingleSemesterService(id);

    sendResponse<IAcademicSemesterType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Semester ',
      data: result,
    });
  }
);

export const updateSingleAccountSemestersController = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;

    const result = await updateSingleSemesterService(id, updateData);

    sendResponse<IAcademicSemesterType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Semester ',
      data: result,
    });
  }
);

export const deleteAcademicSemester = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteSingleSemesterService(id);

    sendResponse<IAcademicSemesterType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Deleted Semester ',
      data: result,
    });
  }
);
