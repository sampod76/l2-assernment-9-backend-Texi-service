"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequestZod_1 = __importDefault(require("../../middlewares/validateRequestZod"));
const service_constroller_1 = require("./service.constroller");
const service_validation_1 = require("./service.validation");
const router = express_1.default.Router();
router
    .route('/')
    .get(service_constroller_1.ServiceController.getAllService)
    .post((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(service_validation_1.ServicesValidation.createServiceZodSchema), service_constroller_1.ServiceController.createService);
router
    .route('/:id')
    .get(service_constroller_1.ServiceController.getSingleService)
    .patch((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(service_validation_1.ServicesValidation.updateServiceZodSchema), service_constroller_1.ServiceController.updateService)
    .delete((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), service_constroller_1.ServiceController.deleteService);
exports.ServiceRoute = router;
