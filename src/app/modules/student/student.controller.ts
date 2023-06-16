import {
  getAllStudentServices,
  getSingleStudentService,
  updateSingleStudentService,
  deleteSingleStudentService,
} from './student.service';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { Request, Response } from 'express';
import { sendResponse } from '../../../shareble/sendResponce';
import httpStatus from 'http-status';
import { pick } from '../../../shareble/pick';
import { paginationField } from '../../../constants/pagination';
import { IStudentType } from './student.interface';

import { studentFilterableFields } from './student.constant';

export const getAllStudentController = clearableAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOption = pick(req.query, paginationField);

    const result = await getAllStudentServices(filters, paginationOption);

    sendResponse<IStudentType[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Student ',
      paginated: result?.paginated,
      data: result?.data,
    });
  }
);

export const getSingleAccountStudentsController = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await getSingleStudentService(id);

    sendResponse<IStudentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Student ',
      data: result,
    });
  }
);

export const updateSingleAccountStudentsController = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;

    const result = await updateSingleStudentService(id, updateData);

    sendResponse<IStudentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Getting Student ',
      data: result,
    });
  }
);

export const deleteSingleStudent = clearableAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteSingleStudentService(id);

    sendResponse<IStudentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SuccessFully Deleted Student ',
      data: result,
    });
  }
);
