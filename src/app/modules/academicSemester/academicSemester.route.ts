import express from 'express';
import { ValidationRequest } from '../../midlewares/validateRequest';
import { academicSemesterSchemaValidation } from './academicSemester.validation';
import {
  createAcademicSemesterController,
  getAllAccountSemestersController,
} from './academicSemester.controller';

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/create-semester',
  ValidationRequest(academicSemesterSchemaValidation),
  createAcademicSemesterController
);

academicSemesterRouter.get('/', getAllAccountSemestersController);

export default academicSemesterRouter;
