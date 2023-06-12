import {
  createAcademicDepartment,
  getAllDepartmentServices,
  getSingleDepartmentService,
  updateSingleDepartmentService,
  deleteSingleDepartmentService,
} from './academicDepartment.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { Request, Response } from 'express';
import { sendResponse } from '../../../shareble/sendResponce';
import httpStatus from 'http-status';
import { pick } from '../../../shareble/pick';
import { paginationField } from '../../../constants/pagination';
import { IAcademicDepartmentType } from './academicDepartment.interface';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';

export const createAcademicDepartmentController = clearableAsync(
  async (req: Request, res: Response) => {
    const academicDepartmentData = req.body;
    const result = await createAcademicDepartment(academicDepartmentData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Create SuccessFully',
      data: result,
    });
  }
);

export const getAllAccountDepartmentController = clearableAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const paginationOption = pick(req.query, paginationField);

    const result = await getAllDepartmentServices(filters, paginationOption);

    sendResponse<IAcademicDepartmentType[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Department ',
      paginated: result?.paginated,
      data: result?.data,
    });
  }
);

export const getSingleAccountDepartmentController = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await getSingleDepartmentService(id);

    sendResponse<IAcademicDepartmentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Department ',
      data: result,
    });
  }
);

export const updateSingleAccountDepartmentController = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;

    const result = await updateSingleDepartmentService(id, updateData);

    sendResponse<IAcademicDepartmentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Updating Department ',
      data: result,
    });
  }
);

export const deleteAcademicDepartment = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteSingleDepartmentService(id);

    sendResponse<IAcademicDepartmentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Deleted Department ',
      data: result,
    });
  }
);
