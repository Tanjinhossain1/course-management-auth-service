import express from 'express';
import { ValidationRequest } from '../../midlewares/validateRequest';

import {
  createAcademicDepartmentController,
  getAllAccountDepartmentController,
  getSingleAccountDepartmentController,
  updateSingleAccountDepartmentController,
  deleteAcademicDepartment,
} from './academicDepartment.controller';
import {
  academicDepartmentSchemaValidation,
  updateAcademicDepartmentSchemaValidation,
} from './academicDepartment.validation';

const academicDepartmentRouter = express.Router();

academicDepartmentRouter.post(
  '/create-department',
  ValidationRequest(academicDepartmentSchemaValidation),
  createAcademicDepartmentController
);

academicDepartmentRouter.get('/:id', getSingleAccountDepartmentController);

academicDepartmentRouter.patch(
  '/:id',
  ValidationRequest(updateAcademicDepartmentSchemaValidation),
  updateSingleAccountDepartmentController
);

academicDepartmentRouter.delete('/:id', deleteAcademicDepartment);

academicDepartmentRouter.get('/', getAllAccountDepartmentController);

export default academicDepartmentRouter;
