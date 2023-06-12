import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helper/paginationHelper';
import {
  IGenericPaginatedType,
  IPaginationOptionType,
} from '../../../types/common';
import { searchableFields, titleCodeMapper } from './academicSemester.constant';
import {
  IAcademicSemesterFilterType,
  IAcademicSemesterType,
} from './academicSemester.interface';
import { academicSemester } from './academicSemester.model';
import httpStatus from 'http-status';

export const createAcademicSemester = async (
  academic_semester: IAcademicSemesterType
): Promise<IAcademicSemesterType | null> => {
  if (titleCodeMapper[academic_semester.title] !== academic_semester.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Academic Semester Code Is ${
        titleCodeMapper[academic_semester.title]
      } But You Give ${academic_semester.code} That Is Wrong`
    );
  }

  const result = await academicSemester.create(academic_semester);
  return result;
};

export const getAllSemesterServices = async (
  filters: IAcademicSemesterFilterType,
  pagination: IPaginationOptionType
): Promise<IGenericPaginatedType<IAcademicSemesterType[]> | null> => {
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

  const result = await academicSemester
    .find(filteringCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await academicSemester.countDocuments();

  return {
    paginated: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleSemesterService = async (
  id: string
): Promise<IAcademicSemesterType | null> => {
  const result = await academicSemester.findById(id);

  return result;
};

export const updateSingleSemesterService = async (
  id: string,
  updateData: Partial<IAcademicSemesterType>
): Promise<IAcademicSemesterType | null> => {
  if (
    updateData.title &&
    updateData.code &&
    titleCodeMapper[updateData.title] !== updateData.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Academic Semester Code Is ${
        titleCodeMapper[updateData.title]
      } But You Give ${updateData.code} That Is Wrong`
    );
  }
  const result = await academicSemester.findOneAndUpdate(
    { _id: id },
    updateData,
    {
      new: true,
    }
  );

  return result;
};

export const deleteSingleSemesterService = async (
  id: string
): Promise<IAcademicSemesterType | null> => {
  const result = await academicSemester.findByIdAndDelete({ _id: id });

  return result;
};
