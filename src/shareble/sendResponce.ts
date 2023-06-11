import { Response } from 'express';
import { paginateType } from '../types/common';

type IApiResponseType<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  paginated?: paginateType | null;
  data?: T | null;
};
export const sendResponse = <T>(
  res: Response,
  data: IApiResponseType<T | null>
): void => {
  const responseData: IApiResponseType<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    paginated: data.paginated || null || undefined,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};
