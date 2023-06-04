import { Request, Response, NextFunction } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../types/errors'
import { handleValidationError } from '../../errors/handleValudationError'
import { IErrorReturnResponseType } from '../../types/common'
import ApiError from '../../errors/ApiError'

export const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something Went Wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidatorError') {
    const getValidateError: IErrorReturnResponseType =
      handleValidationError(err)
    statusCode = getValidateError.statusCode
    message = getValidateError.message
    errorMessages = getValidateError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err?.stack : undefined,
  })

  next()
}
