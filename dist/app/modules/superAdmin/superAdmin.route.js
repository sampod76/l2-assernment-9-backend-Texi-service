"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequestZod_1 = __importDefault(require("../../middlewares/validateRequestZod"));
const superAdmin_controller_1 = require("./superAdmin.controller");
const superAdmin_validations_1 = require("./superAdmin.validations");
const router = express_1.default.Router();
router.route('/').get(superAdmin_controller_1.SuperAdminController.getAllSuperAdmins);
router
    .route('/:id')
    .get((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.SUPER_ADMIN), superAdmin_controller_1.SuperAdminController.getSingleSuperAdmin)
    .patch((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(superAdmin_validations_1.SuperAdminValidation.updateSuperAdmin), superAdmin_controller_1.SuperAdminController.updateSuperAdmin)
    .delete((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.SUPER_ADMIN), superAdmin_controller_1.SuperAdminController.deleteSuperAdmin);
exports.SuperAdminRoutes = router;
