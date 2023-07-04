'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createStudentService = void 0;
const user_model_1 = require('./user.model');
const user_utils_1 = require('./user.utils');
const config_1 = __importDefault(require('../../../config'));
const academicSemester_model_1 = require('../academicSemester/academicSemester.model');
const mongoose_1 = __importDefault(require('mongoose'));
const student_model_1 = require('../student/student.model');
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const http_status_1 = __importDefault(require('http-status'));
const createStudentService = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
      user.password = config_1.default.default_student_password;
    }
    // set role
    user.role = 'student';
    const findAcademicSemester =
      yield academicSemester_model_1.academicSemester.findById(
        student.academicSemester
      );
    // generate student id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, user_utils_1.createStudentId)(findAcademicSemester);
      student.id = id;
      user.id = id;
      const createStudent = yield student_model_1.StudentModel.create(
        [student],
        { session }
      );
      if (!createStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed To Create Student'
        );
      }
      // set student _id in user
      user.student = createStudent[0]._id;
      const newUser = yield user_model_1.UserModel.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed To Create User'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.UserModel.findOne({
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
  });
exports.createStudentService = createStudentService;
