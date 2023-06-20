import { UserModel } from './user.model';
import { IUserType } from './user.interface';
import { createAdminId, createFacultyId, createStudentId } from './user.utils';
import config from '../../../config';
import { IStudentType } from '../student/student.interface';
import { academicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { StudentModel } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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

export const createFacultyService = async (
  faculty: IFaculty,
  user: IUserType
): Promise<IUserType | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  // set role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await createFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await UserModel.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
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
      path: 'faculty',
      populate: [
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

export const createAdminService = async (
  admin: IAdmin,
  user: IUserType
): Promise<IUserType | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = 'admin';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await createAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await UserModel.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
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
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};
