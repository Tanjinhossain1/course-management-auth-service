import { Application } from 'express';
import cors from 'cors';
import express from 'express';
import { globalErrorHandler } from './app/midlewares/globalErrorHandler';
import Routes from './app/routes';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application route
app.use('/api/v1/', Routes);

//global error handler
app.use(globalErrorHandler);

export default app;
