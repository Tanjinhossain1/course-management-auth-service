import { IGenericErrorMessage } from './errors'

export interface IErrorReturnResponseType {
  statusCode: number | number
  message: string
  errorMessages: IGenericErrorMessage[]
}
