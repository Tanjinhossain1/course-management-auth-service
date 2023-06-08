import express from 'express';
import { ValidationRequest } from '../../midlewares/validateRequest';
import { academicSemesterSchemaValidation } from './academicSemester.validation';
import { createAcademicSemesterController } from './academicSemester.controller';

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/create-semester',
  ValidationRequest(academicSemesterSchemaValidation),
  createAcademicSemesterController
);

export default academicSemesterRouter;
