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
exports.SuperAdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constant/pagination");
const catchAsync_1 = __importDefault(require("../../share/catchAsync"));
const pick_1 = __importDefault(require("../../share/pick"));
const sendResponse_1 = __importDefault(require("../../share/sendResponse"));
const superAdmin_constant_1 = require("./superAdmin.constant");
const superAdmin_service_1 = require("./superAdmin.service");
const getAllSuperAdmins = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, superAdmin_constant_1.superAdminFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.PAGINATION_FIELDS);
    const result = yield superAdmin_service_1.SuperAdminService.getAllSuperAdmins(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuperAdmins retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleSuperAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield superAdmin_service_1.SuperAdminService.getSingleSuperAdmin(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuperAdmin retrieved successfully !',
        data: result,
    });
}));
const updateSuperAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield superAdmin_service_1.SuperAdminService.updateSuperAdmin(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuperAdmin updated successfully !',
        data: result,
    });
}));
const deleteSuperAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield superAdmin_service_1.SuperAdminService.deleteSuperAdmin(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuperAdmin deleted successfully !',
        data: result,
    });
}));
exports.SuperAdminController = {
    getAllSuperAdmins,
    getSingleSuperAdmin,
    updateSuperAdmin,
    deleteSuperAdmin,
};
