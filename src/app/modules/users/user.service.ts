import { UserModel } from './user.model';
import { IUserType } from './user.interface';
import { createStudentId } from './user.utils';
import config from '../../../config';
import { IStudentType } from '../student/student.interface';
import { academicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { StudentModel } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

export const createStudentService = async (
  student: IStudentType,
  user: IUserType
): Promise<IUserType | null> => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  // set role
  user.role = 'student';

  const findAcademicSemester = await academicSemester.findById(
    student.academicSemester
  );

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await createStudentId(findAcademicSemester);
    student.id = id;
    user.id = id;

    const createStudent = await StudentModel.create([student], { session });

    if (!createStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Create Student');
    }
    // set student _id in user
    user.student = createStudent[0]._id;

    const newUser = await UserModel.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await UserModel.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};
