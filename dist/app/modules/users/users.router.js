"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequestZod_1 = __importDefault(require("../../middlewares/validateRequestZod"));
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router
    .route('/create-general-user')
    .post((0, validateRequestZod_1.default)(users_validation_1.UserValidation.createGeneralUserZodSchema), users_controller_1.UserController.createGeneralUser);
router
    .route('/create-admin')
    .post((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(users_validation_1.UserValidation.createAdminZodSchema), users_controller_1.UserController.createAdmin);
router
    .route('/create-super-admin')
    .post((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(users_validation_1.UserValidation.createSuperAdminZodSchema), users_controller_1.UserController.createSuperAdmin);
router
    .route('/profile')
    .get((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), users_controller_1.UserController.getProfile);
router
    .route('/update-role/:id')
    .patch((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(users_validation_1.UserValidation.updateRole), users_controller_1.UserController.updateRole);
// .patch(authMiddleware(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.GENERAL_USER,),
// UserController.updateProfile
// ,);
exports.UserRoute = router;
