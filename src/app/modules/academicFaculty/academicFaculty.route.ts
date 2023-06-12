import express from 'express';
import { ValidationRequest } from '../../midlewares/validateRequest';

import {
  createAcademicFacultyController,
  getAllAccountFacultyController,
  getSingleAccountFacultyController,
  updateSingleAccountFacultyController,
  deleteAcademicFaculty,
} from './academicFaculty.controller';
import {
  academicFacultySchemaValidation,
  updateAcademicFacultySchemaValidation,
} from './academicFaculty.validation';

const academicFacultyRouter = express.Router();

academicFacultyRouter.post(
  '/create-faculty',
  ValidationRequest(academicFacultySchemaValidation),
  createAcademicFacultyController
);

academicFacultyRouter.get('/:id', getSingleAccountFacultyController);

academicFacultyRouter.patch(
  '/:id',
  ValidationRequest(updateAcademicFacultySchemaValidation),
  updateSingleAccountFacultyController
);

academicFacultyRouter.delete('/:id', deleteAcademicFaculty);

academicFacultyRouter.get('/', getAllAccountFacultyController);

export default academicFacultyRouter;
