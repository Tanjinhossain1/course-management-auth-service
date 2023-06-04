import { Application } from 'express'
import cors from 'cors'
import express from 'express'
import usersRouter from './app/modules/users/users.routes'
import { globalErrorHandler } from './app/midlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application route

app.use('/api/v1/users', usersRouter)

//global error handler
app.use(globalErrorHandler)

export default app
