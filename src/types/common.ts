import { SortOrder } from 'mongoose';
import { IGenericErrorMessage } from './errors';

export interface IErrorReturnResponseType {
  statusCode: number | number;
  message: string;
  errorMessages: IGenericErrorMessage[];
}

// for paginated common types
export interface paginateType {
  page: number;
  limit: number;
  total: number;
}
export type IGenericPaginatedType<T> = {
  paginated: paginateType;
  data: T;
};

export interface IPaginationOptionType {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}
