import express from 'express';
import { ValidationRequest } from '../../midlewares/validateRequest';
import {
  academicSemesterSchemaValidation,
  updateAcademicSemesterSchemaValidation,
} from './academicSemester.validation';
import {
  createAcademicSemesterController,
  getAllAccountSemestersController,
  getSingleAccountSemestersController,
  updateSingleAccountSemestersController,
  deleteAcademicSemester,
} from './academicSemester.controller';

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/create-semester',
  ValidationRequest(academicSemesterSchemaValidation),
  createAcademicSemesterController
);

academicSemesterRouter.get('/:id', getSingleAccountSemestersController);

academicSemesterRouter.patch(
  '/:id',
  ValidationRequest(updateAcademicSemesterSchemaValidation),
  updateSingleAccountSemestersController
);

academicSemesterRouter.delete('/:id', deleteAcademicSemester);

academicSemesterRouter.get('/', getAllAccountSemestersController);

export default academicSemesterRouter;
