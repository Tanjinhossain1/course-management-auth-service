import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.service';
import { paginationField } from '../../../constants/pagination';
import { pick } from '../../../shareble/pick';
import { clearableAsync } from '../../../shareble/clearableAsync';
import { sendResponse } from '../../../shareble/sendResponce';

const createDepartment = clearableAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await ManagementDepartmentService.createDepartment(
    departmentData
  );

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department created successfully',
    data: result,
  });
});

const getAllDepartments = clearableAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await ManagementDepartmentService.getAllDepartments(
      filters,
      paginationOptions
    );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management departments retrieved successfully',
      paginated: result.paginated,
      data: result.data,
    });
  }
);

const getSingleDepartment = clearableAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.getSingleDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retieved successfully',
      data: result,
    });
  }
);

const updateDepartment = clearableAsync(
  clearableAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    });
  })
);

const deleteDepartment = clearableAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.deleteDepartment(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department deleted successfully',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
