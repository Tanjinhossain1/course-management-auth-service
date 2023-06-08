import { Application } from 'express';
import cors from 'cors';
import express from 'express';
import usersRouter from './app/modules/users/user.routes';
import { globalErrorHandler } from './app/midlewares/globalErrorHandler';
import academicSemesterRouter from './app/modules/academicSemester/academicSemester.route';
// import ApiError from './errors/ApiError'

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application route

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/academic-semester', academicSemesterRouter);

// app.get('/', async (res: Response)=>{
//     // Promise.reject(new Error('Unhandled promise rejection'))
// })

//global error handler
app.use(globalErrorHandler);

export default app;
