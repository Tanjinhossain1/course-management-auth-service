import { Application } from 'express'
import cors from 'cors'
import express from 'express'
import usersRouter from './modules/users/users.routes'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application route

app.use('/api/v1/users', usersRouter)

export default app
