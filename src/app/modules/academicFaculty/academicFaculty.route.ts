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
import { USER_ROLE_ENUM } from '../../../enums/userEnum';
import { auth } from '../../midlewares/auth';

const academicFacultyRouter = express.Router();

academicFacultyRouter.post(
  '/create-faculty',
  ValidationRequest(academicFacultySchemaValidation),
  auth(USER_ROLE_ENUM.ADMIN),
  createAcademicFacultyController
);

academicFacultyRouter.get(
  '/:id',
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.FACULTY, USER_ROLE_ENUM.STUDENT),
  getSingleAccountFacultyController
);

academicFacultyRouter.patch(
  '/:id',
  ValidationRequest(updateAcademicFacultySchemaValidation),
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.FACULTY),
  updateSingleAccountFacultyController
);

academicFacultyRouter.delete(
  '/:id',
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.SUPER_ADMIN),
  deleteAcademicFaculty
);

academicFacultyRouter.get(
  '/',
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.FACULTY, USER_ROLE_ENUM.STUDENT),
  getAllAccountFacultyController
);

export default academicFacultyRouter;
