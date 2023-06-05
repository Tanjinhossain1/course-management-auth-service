import mongoose, { CastError } from 'mongoose'
import { IGenericErrorMessage } from '../types/errors'
import { IErrorReturnResponseType } from '../types/common'

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IErrorReturnResponseType => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (errorEl: mongoose.Error.ValidatorError | CastError) => {
      return {
        path: errorEl?.path,
        message: errorEl?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode: statusCode,
    errorMessages: errors,
    message: 'Validation Error',
  }
}
