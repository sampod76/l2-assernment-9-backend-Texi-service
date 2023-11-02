"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const service_consent_1 = require("./service.consent");
const service_model_1 = require("./service.model");
const mongoose_1 = require("mongoose");
const createServiceByDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield service_model_1.Service.create(payload)).populate([
        {
            path: 'publisher',
            select: {
                needsPasswordChange: 0,
                createdAt: 0,
                updatedAt: 0,
                password: 0,
                __v: 0,
            },
            populate: [
                {
                    path: 'superAdmin',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
                {
                    path: 'generalUser',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
                {
                    path: 'admin',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
            ],
        },
        {
            path: 'category',
        },
    ]);
    return result;
});
//getAllCourseFromDb
const getAllServiceFromDb = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //****************search and filters start************/
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: service_consent_1.SERVICE_SEARCHABLE_FIELDS.map(field => 
            //search array value
            field === 'tag'
                ? { [field]: { $in: [new RegExp(searchTerm, 'i')] } }
                : {
                    [field]: new RegExp(searchTerm, 'i'),
                }),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => field === 'category'
                ? { [field]: new mongoose_1.Types.ObjectId(value) }
                : { [field]: value }),
        });
    }
    console.log(filtersData);
    //****************search and filters end**********/
    //****************pagination start **************/
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
    //****************pagination end ***************/
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield service_model_1.Service.find(whereConditions)
        .populate([
        {
            path: 'publisher',
            select: {
                needsPasswordChange: 0,
                createdAt: 0,
                updatedAt: 0,
                password: 0,
                __v: 0,
            },
            populate: [
                {
                    path: 'superAdmin',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
                {
                    path: 'generalUser',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
                {
                    path: 'admin',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
            ],
        },
        {
            path: 'category',
        },
    ])
        .sort(sortConditions)
        .skip(Number(skip))
        .limit(Number(limit));
    const total = yield service_model_1.Service.find(whereConditions).countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single e form db
const getSingleServiceFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById(id).populate([
        {
            path: 'publisher',
            select: {
                needsPasswordChange: 0,
                createdAt: 0,
                updatedAt: 0,
                password: 0,
                __v: 0,
            },
            populate: [
                {
                    path: 'superAdmin',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
                {
                    path: 'generalUser',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
                {
                    path: 'admin',
                    select: { createdAt: 0, updatedAt: 0, __v: 0 },
                },
            ],
        },
        {
            path: 'category',
        },
    ]);
    return result;
});
// update e form db
const updateServiceFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const otherData = __rest(payload, []);
    const updateData = Object.assign({}, otherData);
    const result = yield service_model_1.Service.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new ApiError_1.default(500, 'Service update fail!!😪😭😰');
    }
    return result;
});
// delete e form db
const deleteServiceByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndDelete(id);
    return result;
});
exports.TravelService = {
    createServiceByDb,
    getAllServiceFromDb,
    getSingleServiceFromDb,
    updateServiceFromDb,
    deleteServiceByIdFromDb,
};
