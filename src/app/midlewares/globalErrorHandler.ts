import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../types/errors';
import {
  handleValidationError,
  validationZodError,
} from '../../errors/handleValidationError';
import { IErrorReturnResponseType } from '../../types/common';
import ApiError from '../../errors/ApiError';
import { ZodError } from 'zod';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = 'Something Went Wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidatorError') {
    /* ************ mongoose validation Error handler *********** */
    const getValidateError: IErrorReturnResponseType =
      handleValidationError(err);

    statusCode = getValidateError.statusCode;
    message = getValidateError.message;
    errorMessages = getValidateError.errorMessages;
  } else if (err instanceof ApiError) {
    /* ************ mongoose validation Error handler *********** */
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  } else if (err instanceof ZodError) {
    /* ************ Zod validation Error handler *********** */
    const getValidateZodError: IErrorReturnResponseType =
      validationZodError(err);
    statusCode = getValidateZodError.statusCode;
    message = getValidateZodError.message;
    errorMessages = getValidateZodError.errorMessages;
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  }

  /* ************ send the status of final structure of error *********** */
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err?.stack : undefined,
  });

  next();
};
