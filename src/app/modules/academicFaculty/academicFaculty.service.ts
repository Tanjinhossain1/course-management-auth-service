import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import {
  IGenericPaginatedType,
  IPaginationOptionType,
} from '../../../types/common';
import { searchableFields } from './academicFaculty.constant';
import {
  IAcademicFacultyFilterType,
  IAcademicFacultyType,
} from './academicFaculty.interface';
import { academicFaculty } from './academicFaculty.model';
export const createAcademicFaculty = async (
  academic_faculty: IAcademicFacultyType
): Promise<IAcademicFacultyType | null> => {
  const result = await academicFaculty.create(academic_faculty);
  return result;
};

export const getAllFacultyServices = async (
  filters: IAcademicFacultyFilterType,
  pagination: IPaginationOptionType
): Promise<IGenericPaginatedType<IAcademicFacultyType[]> | null> => {
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

  const result = await academicFaculty
    .find(filteringCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await academicFaculty.countDocuments();

  return {
    paginated: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleFacultyService = async (
  id: string
): Promise<IAcademicFacultyType | null> => {
  const result = await academicFaculty.findById(id);

  return result;
};

export const updateSingleFacultyService = async (
  id: string,
  updateData: Partial<IAcademicFacultyType>
): Promise<IAcademicFacultyType | null> => {
  const result = await academicFaculty.findOneAndUpdate(
    { _id: id },
    updateData,
    {
      new: true,
    }
  );

  return result;
};

export const deleteSingleFacultyService = async (
  id: string
): Promise<IAcademicFacultyType | null> => {
  const result = await academicFaculty.findByIdAndDelete({ _id: id });

  return result;
};
