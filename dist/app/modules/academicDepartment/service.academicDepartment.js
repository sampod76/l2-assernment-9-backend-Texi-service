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
exports.AcademicDepartmentService = void 0;
const paginationHelper_1 = require('../../../helper/paginationHelper');
const consent_academicDepartment_1 = require('./consent.academicDepartment');
const model_academicDepartment_1 = require('./model.academicDepartment');
const createAcademicDepartmentByDb = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield model_academicDepartment_1.AcademicDepartment.create(
      payload
    )).populate('academicFaculty');
    return result;
  });
//getAllAcademicDepartmentFromDb
const getAllAcademicDepartmentFromDb = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //****************search and filters start************/
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: consent_academicDepartment_1.ACADEMIC_DEPARTMENT_SEARCHABLE_FIELDS.map(
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
    const result = yield model_academicDepartment_1.AcademicDepartment.find(
      whereConditions
    )
      .sort(sortConditions)
      .skip(Number(skip))
      .limit(Number(limit));
    const total =
      yield model_academicDepartment_1.AcademicDepartment.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
// get single Departmente form db
const getSignleDepartmentFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_academicDepartment_1.AcademicDepartment.findById(
      id
    ).populate('academicFaculty');
    /* const result = await AcademicDepartment.findById(id).populate(
      'academic_facultys'
    ); */
    return result;
  });
// update Departmente form db
const updateDepartmentFromDb = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield model_academicDepartment_1.AcademicDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        }
      ).populate('academicFaculty');
    return result;
  });
// delete Departmente form db
const deleteDepartmentByIdFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield model_academicDepartment_1.AcademicDepartment.findByIdAndDelete(id);
    return result;
  });
exports.AcademicDepartmentService = {
  createAcademicDepartmentByDb,
  getAllAcademicDepartmentFromDb,
  getSignleDepartmentFromDb,
  updateDepartmentFromDb,
  deleteDepartmentByIdFromDb,
};
