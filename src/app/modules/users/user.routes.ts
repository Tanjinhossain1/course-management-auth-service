import express from 'express';
import {
  createFacultyController,
  createStudentController,
} from './user.controller';
import { ValidationRequest } from '../../midlewares/validateRequest';
import {
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
export default usersRouter;
