import mongoose, { CastError } from 'mongoose';
import { IGenericErrorMessage } from '../types/errors';
import { IErrorReturnResponseType } from '../types/common';
import { ZodError, ZodIssue } from 'zod';

/* ****************************************************************** */
/* *************   mongoose validation error handler   ************** */
/* ****************************************************************** */

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): IErrorReturnResponseType => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (errorEl: mongoose.Error.ValidatorError | CastError) => {
      return {
        path: errorEl?.path,
        message: errorEl?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode: statusCode,
    errorMessages: errors,
    message: 'Validation Error',
  };
};

/* ****************************************************************** */
/* ****************  Zod validation error handler  ****************** */
/* ****************************************************************** */

export const validationZodError = (
  error: ZodError
): IErrorReturnResponseType => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode: statusCode,
    errorMessages: errors,
    message: 'Validation Error',
  };
};
