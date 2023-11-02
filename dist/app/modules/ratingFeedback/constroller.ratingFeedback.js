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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingFeedBackController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constant/pagination");
// import { globalImport } from '../../../import/global_Import';
// import ApiError from '../../errors/ApiError';
const catchAsync_1 = __importDefault(require("../../share/catchAsync"));
const pick_1 = __importDefault(require("../../share/pick"));
const sendResponse_1 = __importDefault(require("../../share/sendResponse"));
const consent_ratingFeedback_1 = require("./consent.ratingFeedback");
const service_ratingFeedback_1 = require("./service.ratingFeedback");
// import { z } from 'zod'
const createRatingFeedBack = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.user = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield service_ratingFeedback_1.RatingFeedBackService.createRatingFeedBackByDb(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'successfull create RatingFeedBack RatingFeedBack',
        data: result,
    });
    // next();
    /* res.status(200).send({
        success: true,
        data: result,
        message: 'successfull create RatingFeedBack RatingFeedBack',
      }); */
}));
const getAllRatingFeedBack = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //****************search and filter start******* */
    let queryObject = req.query;
    queryObject = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(queryObject).filter(([_, value]) => Boolean(value)));
    const filters = (0, pick_1.default)(queryObject, consent_ratingFeedback_1.RATING_FILTERABLE_FIELDS);
    //****************pagination start************ */
    const paginationOptions = (0, pick_1.default)(queryObject, pagination_1.PAGINATION_FIELDS);
    const result = yield service_ratingFeedback_1.RatingFeedBackService.getAllRatingFeedBackFromDb(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'successfull Get RatingFeedBack RatingFeedBack',
        meta: result.meta,
        data: result.data,
    });
    // next();
}));
const getSingleRatingFeedBack = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    /*   if (!globalImport.ObjectId.isValid(id)) {
      throw new ApiError(400, 'invalid id sampod');
    } */
    const result = yield service_ratingFeedback_1.RatingFeedBackService.getSingleRatingFeedBackFromDb(id);
    /* if (!result) {
      throw new ApiError(400, 'No data found');
    } */
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'successfull get RatingFeedBack RatingFeedBack',
        data: result,
    });
}));
const updateRatingFeedBack = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    /*   if (!globalImport.ObjectId.isValid(id)) {
        throw new ApiError(400, 'invalid id sampod');
      } */
    const result = yield service_ratingFeedback_1.RatingFeedBackService.updateRatingFeedBackFromDb(id, updateData);
    /* if (!result) {
        throw new ApiError(400, 'No data found');
      } */
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'successfull update RatingFeedBack RatingFeedBack',
        data: result,
    });
}));
const deleteRatingFeedBack = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_ratingFeedback_1.RatingFeedBackService.deleteRatingFeedBackByIdFromDb(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'successfull delete RatingFeedBack RatingFeedBack',
        data: result,
    });
}));
exports.RatingFeedBackController = {
    createRatingFeedBack,
    getAllRatingFeedBack,
    getSingleRatingFeedBack,
    updateRatingFeedBack,
    deleteRatingFeedBack,
};
