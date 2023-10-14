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
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFacultyService = void 0;
const paginationHelper_1 = require('../../../helper/paginationHelper');
const model_academicFaculty_1 = require('./model.academicFaculty');
const consent_academicFaculty_1 = require('./consent.academicFaculty');
const createAcademicFacultyByDb = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_academicFaculty_1.AcademicFaculty.create(
      payload
    );
    return result;
  });
//getAllAcademicFacultyFromDb
const getAllAcademicFacultyFromDb = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //****************search and filters start************/
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: consent_academicFaculty_1.ACADEMIC_FACULTY_SEARCHABLE_FIELDS.map(
          field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          })
        ),
      });
    }
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
    const result = yield model_academicFaculty_1.AcademicFaculty.find(
      whereConditions
    )
      .sort(sortConditions)
      .skip(Number(skip))
      .limit(Number(limit));
    const total =
      yield model_academicFaculty_1.AcademicFaculty.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
// get single Facultye form db
const getSignleFacultyFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_academicFaculty_1.AcademicFaculty.findById(id);
    return result;
  });
// update Facultye form db
const updateFacultyFromDb = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield model_academicFaculty_1.AcademicFaculty.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        }
      );
    return result;
  });
// delete Facultye form db
const deleteFacultyByIdFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield model_academicFaculty_1.AcademicFaculty.findByIdAndDelete(id);
    return result;
  });
exports.AcademicFacultyService = {
  createAcademicFacultyByDb,
  getAllAcademicFacultyFromDb,
  getSignleFacultyFromDb,
  updateFacultyFromDb,
  deleteFacultyByIdFromDb,
};
