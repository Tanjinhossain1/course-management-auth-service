import express from 'express';
import { createStudentController } from './user.controller';
import { ValidationRequest } from '../../midlewares/validateRequest';
import { userSchemaValidation } from './user.validation';

const usersRouter = express.Router();

usersRouter.post(
  '/create-student',
  ValidationRequest(userSchemaValidation),
  createStudentController
);

export default usersRouter;
