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
exports.StudentController = void 0;
const catchAsync_1 = __importDefault(require('../../share/catchAsync'));
const pick_1 = __importDefault(require('../../share/pick'));
const constant_student_1 = require('./constant.student');
const sendResponse_1 = __importDefault(require('../../share/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const service_student_1 = require('./service.student');
const getAllStudents = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(
      req.query,
      constant_student_1.studentFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      constant_student_1.studentSearchableFields
    );
    const result = yield service_student_1.StudentService.getAllStudentsFromDb(
      filter,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Students retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleStudent = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield service_student_1.StudentService.getSingleStudentFromDb(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Student retrieved successfully !',
      data: result,
    });
  })
);
const updateStudent = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield service_student_1.StudentService.updateStudentFromDb(
      id,
      updatedData
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Student updated successfully !',
      data: result,
    });
  })
);
const deleteStudent = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_student_1.StudentService.deleteStudentFromDb(
      id
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Student deleted successfully !',
      data: result,
    });
  })
);
exports.StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
