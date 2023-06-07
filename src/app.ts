import { Application } from 'express';
import cors from 'cors';
import express from 'express';
import usersRouter from './app/modules/users/user.routes';
import { globalErrorHandler } from './app/midlewares/globalErrorHandler';
// import ApiError from './errors/ApiError'

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application route

app.use('/api/v1/users', usersRouter);

// app.get('/', async (res: Response)=>{
//     // Promise.reject(new Error('Unhandled promise rejection'))
// })

//global error handler
app.use(globalErrorHandler);

export default app;
