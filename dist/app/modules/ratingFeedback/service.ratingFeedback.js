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
exports.RatingFeedBackService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const consent_ratingFeedback_1 = require("./consent.ratingFeedback");
const model_ratingFeedback_1 = require("./model.ratingFeedback");
const mongoose_1 = require("mongoose");
const createRatingFeedBackByDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield model_ratingFeedback_1.RatingFeedBackModel.create(payload)).populate([
        {
            path: 'user',
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
            path: 'booking',
        },
    ]);
    return result;
});
//getAllCourseFromDb
const getAllRatingFeedBackFromDb = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //****************search and filters start************/
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: consent_ratingFeedback_1.RATING_SEARCHABLE_FIELDS.map(field => 
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
            $and: Object.entries(filtersData).map(([field, value]) => field === 'service'
                ? { [field]: new mongoose_1.Types.ObjectId(value) }
                : field === 'user'
                    ? { [field]: new mongoose_1.Types.ObjectId(value) }
                    : { [field]: value }),
        });
    }
    //****************search and filters end**********/
    //****************pagination start **************/
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
    //****************pagination end ***************/
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield model_ratingFeedback_1.RatingFeedBackModel.find(whereConditions)
        .populate([
        {
            path: 'user',
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
            path: 'booking',
        },
        {
            path: 'service',
        },
    ])
        .sort(sortConditions)
        .skip(Number(skip))
        .limit(Number(limit));
    const total = yield model_ratingFeedback_1.RatingFeedBackModel.find(whereConditions).countDocuments();
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
const getSingleRatingFeedBackFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_ratingFeedback_1.RatingFeedBackModel.findById(id).populate([
        {
            path: 'user',
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
            path: 'booking',
        },
        {
            path: 'service',
        },
    ]);
    return result;
});
// update e form db
const updateRatingFeedBackFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const otherData = __rest(payload, []);
    const updateData = Object.assign({}, otherData);
    const result = yield model_ratingFeedback_1.RatingFeedBackModel.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new ApiError_1.default(500, 'RatingFeedBackModel update fail!!😪😭😰');
    }
    return result;
});
// delete e form db
const deleteRatingFeedBackByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_ratingFeedback_1.RatingFeedBackModel.findByIdAndDelete(id);
    return result;
});
exports.RatingFeedBackService = {
    createRatingFeedBackByDb,
    getAllRatingFeedBackFromDb,
    getSingleRatingFeedBackFromDb,
    updateRatingFeedBackFromDb,
    deleteRatingFeedBackByIdFromDb,
};
