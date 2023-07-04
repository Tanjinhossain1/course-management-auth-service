import express from 'express';
import {
  createAdminController,
  createFacultyController,
  createStudentController,
} from './user.controller';
import { ValidationRequest } from '../../midlewares/validateRequest';
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  userSchemaValidation,
} from './user.validation';

const usersRouter = express.Router();

usersRouter.post(
  '/create-student',
  ValidationRequest(userSchemaValidation),
  createStudentController
);

usersRouter.post(
  '/create-faculty',
  ValidationRequest(createFacultyZodSchema),
  createFacultyController
);

usersRouter.post(
  '/create-admin',
  ValidationRequest(createAdminZodSchema),
  createAdminController
);

export default usersRouter;
