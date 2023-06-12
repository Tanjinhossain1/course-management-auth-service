import {
  createAcademicFaculty,
  getAllFacultyServices,
  getSingleFacultyService,
  updateSingleFacultyService,
  deleteSingleFacultyService,
} from './academicFaculty.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { Request, Response } from 'express';
import { sendResponse } from '../../../shareble/sendResponce';
import httpStatus from 'http-status';
import { pick } from '../../../shareble/pick';
import { paginationField } from '../../../constants/pagination';
import { IAcademicFacultyType } from './academicFaculty.interface';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

export const createAcademicFacultyController = clearableAsync(
  async (req: Request, res: Response) => {
    const academicFacultyData = req.body;
    const result = await createAcademicFaculty(academicFacultyData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Create SuccessFully',
      data: result,
    });
  }
);

export const getAllAccountFacultyController = clearableAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOption = pick(req.query, paginationField);

    const result = await getAllFacultyServices(filters, paginationOption);

    sendResponse<IAcademicFacultyType[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Faculty ',
      paginated: result?.paginated,
      data: result?.data,
    });
  }
);

export const getSingleAccountFacultyController = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await getSingleFacultyService(id);

    sendResponse<IAcademicFacultyType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Faculty ',
      data: result,
    });
  }
);

export const updateSingleAccountFacultyController = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;

    const result = await updateSingleFacultyService(id, updateData);

    sendResponse<IAcademicFacultyType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Updating Faculty ',
      data: result,
    });
  }
);

export const deleteAcademicFaculty = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteSingleFacultyService(id);

    sendResponse<IAcademicFacultyType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Deleted Faculty ',
      data: result,
    });
  }
);
