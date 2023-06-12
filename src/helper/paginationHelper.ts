import { SortOrder } from 'mongoose';
import { IPaginationOptionType } from '../types/common';

interface ICalculateReturnTye {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
  skip: number;
}
export const calculatePagination = (
  options: IPaginationOptionType
): ICalculateReturnTye => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
