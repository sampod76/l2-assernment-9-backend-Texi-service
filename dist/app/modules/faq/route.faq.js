"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoute = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequestZod_1 = __importDefault(require("../../middlewares/validateRequestZod"));
const constroller_faq_1 = require("./constroller.faq");
const validation_faq_1 = require("./validation.faq");
const router = express_1.default.Router();
router
    .route('/')
    // This route is open
    .get(constroller_faq_1.FaqController.getAllFaq)
    .post((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(validation_faq_1.FaqValidation.createFaqZodSchema), constroller_faq_1.FaqController.createFaq);
router
    .route('/:id')
    // This route is open
    .get(constroller_faq_1.FaqController.getSingleFaq)
    .patch((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(validation_faq_1.FaqValidation.updateFaqZodSchema), constroller_faq_1.FaqController.updateFaq)
    .delete((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), constroller_faq_1.FaqController.deleteFaq);
exports.FaqRoute = router;
