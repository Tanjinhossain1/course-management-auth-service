import express from 'express';
import { authZodSchemaValidation } from './auth.validation';
import { loginUserController } from './auth.controller';
import { ValidationRequest } from '../../midlewares/validateRequest';
const authRouter = express.Router();

authRouter.post(
  '/login',
  ValidationRequest(authZodSchemaValidation),
  loginUserController
);

export default authRouter;
