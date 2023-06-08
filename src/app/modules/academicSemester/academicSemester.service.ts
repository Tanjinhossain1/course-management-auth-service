import ApiError from '../../../errors/ApiError';
import { titleCodeMapper } from './academicSemester.constant';
import { IAcademicSemesterType } from './academicSemester.interface';
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
