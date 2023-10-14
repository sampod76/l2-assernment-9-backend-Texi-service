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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const paginationHelper_1 = require('../../../helper/paginationHelper');
const ApiError_1 = __importDefault(require('../../errors/ApiError'));
const consent_academicSemester_1 = require('./consent.academicSemester');
const model_academicSemester_1 = require('./model.academicSemester');
const createAcademicSemesterByDb = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    //এখানে চেক করা হচ্ছে সেমিস্টারের নামের সাথে তার কোড মিল আছে কিনা
    if (
      consent_academicSemester_1.ACADEMIC_SEMESTER_TITLE_CODE_MAPPER[
        payload.title
      ] !== payload.code
    ) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid Semester code'
      );
    }
    const result = yield model_academicSemester_1.AcademicSemester.create(
      payload
    );
    return result;
  });
//getAllAcademicSemesterFromDb
const getAllAcademicSemesterFromDb = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //****************search and filters start************/
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    // export const ACADEMIC_SEMESTER_SEARCHABLE_FIELDS = ['title', 'code', 'year'];
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: consent_academicSemester_1.ACADEMIC_SEMESTER_SEARCHABLE_FIELDS.map(
          field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          })
        ),
      });
    }
    /*
     const andConditions = [
      {
        $or: [
          {
            title: {
              $regex: searchTerm,
              $options: 'i',
            },
          },
          {
            year: {
              $regex: searchTerm,
              $options: 'i',
            },
          },
          {
            code: {
              $regex: searchTerm,
              $options: 'i',
            },
          },
        ],
      },
    ]; */
    //Filters
    /*
     console.log(Object.entries(filtersData));
     এইভাবে দিলে সে অবজেক্টের key এবং value মিলিয়ে এরে বানিয়ে দেবে
    ans: { year: '2021', title: 'Autumn' }
        [ [ 'year', '2021' ], [ 'title', 'Autumn' ] ]
    */
    //
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    //****************search and filters end**********/
    //****************pagination start **************/
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelper.calculatePagination(
        paginationOptions
      );
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    //****************pagination end ***************/
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield model_academicSemester_1.AcademicSemester.find(
      whereConditions
    )
      .sort(sortConditions)
      .skip(Number(skip))
      .limit(Number(limit));
    const total =
      yield model_academicSemester_1.AcademicSemester.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
// get single semestere form db
const getSignleSemesterFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_academicSemester_1.AcademicSemester.findById(id);
    return result;
  });
// update semestere form db
const updateSemesterFromDb = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      payload.title &&
      payload.code &&
      consent_academicSemester_1.ACADEMIC_SEMESTER_TITLE_CODE_MAPPER[
        payload.title
      ] !== payload.code
    ) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid Semester code'
      );
    }
    const result =
      yield model_academicSemester_1.AcademicSemester.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        }
      );
    return result;
  });
// delete semestere form db
const deleteSemesterByIdFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield model_academicSemester_1.AcademicSemester.findByIdAndDelete(id);
    return result;
  });
exports.AcademicSemesterService = {
  createAcademicSemesterByDb,
  getAllAcademicSemesterFromDb,
  getSignleSemesterFromDb,
  updateSemesterFromDb,
  deleteSemesterByIdFromDb,
};
