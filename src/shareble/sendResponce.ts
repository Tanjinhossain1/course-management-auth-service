import { Response } from 'express';

type IApiResponseType<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data: T | null;
};
export const sendResponse = <T>(
  res: Response,
  data: IApiResponseType<T>
): void => {
  const responseData: IApiResponseType<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};
