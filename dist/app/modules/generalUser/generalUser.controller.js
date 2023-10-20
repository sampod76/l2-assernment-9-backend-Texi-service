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
exports.GeneralUserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constant/pagination");
const catchAsync_1 = __importDefault(require("../../share/catchAsync"));
const pick_1 = __importDefault(require("../../share/pick"));
const sendResponse_1 = __importDefault(require("../../share/sendResponse"));
const generalUser_constant_1 = require("./generalUser.constant");
const generalUser_service_1 = require("./generalUser.service");
const getAllGeneralUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, generalUser_constant_1.generalUserFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.PAGINATION_FIELDS);
    const result = yield generalUser_service_1.GeneralUserService.getAllGeneralUsers(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'GeneralUsers retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleGeneralUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield generalUser_service_1.GeneralUserService.getSingleGeneralUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'GeneralUser retrieved successfully !',
        data: result,
    });
}));
const updateGeneralUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield generalUser_service_1.GeneralUserService.updateGeneralUser(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'GeneralUser updated successfully !',
        data: result,
    });
}));
const deleteGeneralUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield generalUser_service_1.GeneralUserService.deleteGeneralUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'GeneralUser deleted successfully !',
        data: result,
    });
}));
exports.GeneralUserController = {
    getAllGeneralUsers,
    getSingleGeneralUser,
    updateGeneralUser,
    deleteGeneralUser,
};
