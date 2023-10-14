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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const index_1 = __importDefault(require('../../../config/index'));
const ApiError_1 = __importDefault(require('../../errors/ApiError'));
const model_academicSemester_1 = require('../academicSemester/model.academicSemester');
const model_student_1 = require('../student/model.student');
const users_model_1 = require('./users.model');
const users_utils_1 = require('./users.utils');
const createStudentFromdb = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //auto generate user id
    // auto set user password
    if (!user.password) {
      user.password = index_1.default.default_student_pass;
    }
    user.role = 'student';
    const academicSemester =
      yield model_academicSemester_1.AcademicSemester.findById(
        student.academicSemester
      );
    if (!academicSemester) {
      throw new ApiError_1.default(400, 'academic semester not found');
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, users_utils_1.generateStudentId)(academicSemester);
      user.id = id;
      student.id = id;
      //array
      const newStudent = yield model_student_1.StudentModel.create([student], {
        session,
      });
      if (!newStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student'
        );
      }
      //set student -->  _id into user.student
      user.student = newStudent[0]._id;
      const newUser = yield users_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
      //user --> student ---> academicSemester, academicDepartment , academicFaculty
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield users_model_1.User.findOne({
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
exports.UserServices = {
  createStudentFromdb,
};
/* if (newUserAllData) {
  newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
    path: 'student',
    populate: [
      {
        path: 'academicSemester',
        model: 'academic_semester',
      },
      {
        path: 'academicDepartment',
        model: 'academic_Department',
      },
      {
        path: 'academicFaculty',
        model: 'academic_faculty',
      },
    ],
  });
} */
