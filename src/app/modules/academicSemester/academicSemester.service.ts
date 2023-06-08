import { IAcademicSemesterType } from './academicSemester.interface';
import { academicSemester } from './academicSemester.model';

export const createAcademicSemester = async (
  academic_semester: IAcademicSemesterType
): Promise<IAcademicSemesterType | null> => {
  const result = await academicSemester.create(academic_semester);

  return result;
};
