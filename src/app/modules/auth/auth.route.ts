import express from 'express';
import {
  authZodSchemaValidation,
  changePasswordZodSchemaValidation,
  refreshTokenZodSchemaValidation,
} from './auth.validation';
import {
  createRefreshTokenController,
  loginUserController,
  changePasswordController,
} from './auth.controller';
import { ValidationRequest } from '../../midlewares/validateRequest';
import { auth } from '../../midlewares/auth';
import { USER_ROLE_ENUM } from '../../../enums/userEnum';
const authRouter = express.Router();

authRouter.post(
  '/login',
  ValidationRequest(authZodSchemaValidation),
  loginUserController
);
authRouter.post(
  '/refresh-token',
  ValidationRequest(refreshTokenZodSchemaValidation),
  createRefreshTokenController
);

authRouter.post(
  '/change-password',
  auth(
    USER_ROLE_ENUM.SUPER_ADMIN,
    USER_ROLE_ENUM.ADMIN,
    USER_ROLE_ENUM.STUDENT,
    USER_ROLE_ENUM.FACULTY
  ),
  ValidationRequest(changePasswordZodSchemaValidation),
  changePasswordController
);

export default authRouter;
