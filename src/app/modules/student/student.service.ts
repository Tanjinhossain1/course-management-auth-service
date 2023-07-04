/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import {
  IGenericPaginatedType,
  IPaginationOptionType,
} from '../../../types/common';
import { studentFilterableFields } from './student.constant';
import { IStudentFilters, IStudentType } from './student.interface';
import { StudentModel } from './student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

export const getAllStudentServices = async (
  filters: IStudentFilters,
  pagination: IPaginationOptionType
): Promise<IGenericPaginatedType<IStudentType[]> | null> => {
  const { searchTerm, ...filtersData } = filters;

  const { skip, limit, page, sortBy, sortOrder } =
    calculatePagination(pagination);
  const sortConditions: { [key: string]: SortOrder } = {};

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentFilterableFields.map(field => ({
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

  const result = await StudentModel.find(filteringCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await StudentModel.countDocuments(filteringCondition);

  return {
    paginated: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleStudentService = async (
  id: string
): Promise<IStudentType | null> => {
  const result = await StudentModel.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

export const updateSingleStudentService = async (
  id: string,
  updateData: Partial<IStudentType>
): Promise<IStudentType | null> => {
  const isExist = await StudentModel.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
  }

  const { name, guardian, localGuardian, ...studentData } = updateData;

  const updatedStudentData: Partial<IStudentType> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    updatedStudentData,
    {
      new: true,
    }
  );

  return result;
};

export const deleteSingleStudentService = async (
  id: string
): Promise<IStudentType | null> => {
  const result = await StudentModel.findByIdAndDelete({ _id: id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};
