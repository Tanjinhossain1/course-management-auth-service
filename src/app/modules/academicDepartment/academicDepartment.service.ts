import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import {
  IGenericPaginatedType,
  IPaginationOptionType,
} from '../../../types/common';
import { searchableFields } from './academicDepartment.constant';
import {
  IAcademicDepartmentFilterType,
  IAcademicDepartmentType,
} from './academicDepartment.interface';
import { academicDepartment } from './academicDepartment.model';
export const createAcademicDepartment = async (
  academic_Department: IAcademicDepartmentType
): Promise<IAcademicDepartmentType | null> => {
  const result = (
    await academicDepartment.create(academic_Department)
  ).populate('academicFaculty');
  return result;
};

export const getAllDepartmentServices = async (
  filters: IAcademicDepartmentFilterType,
  pagination: IPaginationOptionType
): Promise<IGenericPaginatedType<IAcademicDepartmentType[]> | null> => {
  const { searchTerm, ...filtersData } = filters;

  const { skip, limit, page, sortBy, sortOrder } =
    calculatePagination(pagination);
  const sortConditions: { [key: string]: SortOrder } = {};

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const filteringCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await academicDepartment
    .find(filteringCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await academicDepartment.countDocuments();

  return {
    paginated: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleDepartmentService = async (
  id: string
): Promise<IAcademicDepartmentType | null> => {
  const result = await academicDepartment.findById(id);

  return result;
};

export const updateSingleDepartmentService = async (
  id: string,
  updateData: Partial<IAcademicDepartmentType>
): Promise<IAcademicDepartmentType | null> => {
  const result = await academicDepartment.findOneAndUpdate(
    { _id: id },
    updateData,
    {
      new: true,
    }
  );

  return result;
};

export const deleteSingleDepartmentService = async (
  id: string
): Promise<IAcademicDepartmentType | null> => {
  const result = await academicDepartment.findByIdAndDelete({ _id: id });

  return result;
};
