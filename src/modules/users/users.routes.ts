import express from 'express'
import { createUserController } from './users.controller'

const usersRouter = express.Router()

usersRouter.post('/users-create', createUserController)

export default usersRouter
