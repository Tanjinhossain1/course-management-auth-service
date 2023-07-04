import { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { globalErrorHandler } from './app/midlewares/globalErrorHandler';
import Routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// application route
app.use('/api/v1/', Routes);

//global error handler
app.use(globalErrorHandler);

// no route found handle
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route Not Found',
    errorMessage: [
      {
        path: '.',
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
