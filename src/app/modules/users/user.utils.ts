import { IAcademicSemesterType } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

// for student creating id
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastUser = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id ? lastUser?.id.substring(4) : undefined;
};

export const createStudentId = async (
  academicSemester: IAcademicSemesterType | null
) => {
  const userId = (await findLastStudentId()) || (0).toString().padStart(5, '0');
  // increment id by 1

  let incrementUserId = (parseInt(userId) + 1).toString().padStart(5, '0');

  incrementUserId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementUserId}`;

  return incrementUserId;
};

// for faculty creating id

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastUser = await UserModel.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id ? lastUser?.id.substring(2) : undefined;
};

export const createFacultyId = async (): Promise<string> => {
  const facultyId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(facultyId) + 1).toString().padStart(5, '0');

  incrementId = `F-${incrementId}`;
  return incrementId;
};

// for Admin creating id
// export const createAdminId = async () =>{
//   const currentId = (await findLastAdminId)
// }

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await UserModel.findOne(
    { role: 'admin' },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const createAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
