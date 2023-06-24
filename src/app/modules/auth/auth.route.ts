import express from 'express';
import {
  authZodSchemaValidation,
  refreshTokenZodSchemaValidation,
} from './auth.validation';
import {
  createRefreshTokenController,
  loginUserController,
} from './auth.controller';
import { ValidationRequest } from '../../midlewares/validateRequest';
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

export default authRouter;
