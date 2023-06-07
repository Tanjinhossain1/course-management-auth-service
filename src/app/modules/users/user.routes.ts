import express from 'express'
import { createUserController } from './user.controller'
import { ValidationRequest } from '../../midlewares/validateRequest'
import { userSchemaValidation } from './user.validation'

const usersRouter = express.Router()

usersRouter.post(
  '/users-create',
  ValidationRequest(userSchemaValidation),
  createUserController
)

export default usersRouter
