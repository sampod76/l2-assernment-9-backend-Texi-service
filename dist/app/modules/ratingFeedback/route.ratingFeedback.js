"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingFeedBackRoute = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequestZod_1 = __importDefault(require("../../middlewares/validateRequestZod"));
const constroller_ratingFeedback_1 = require("./constroller.ratingFeedback");
const validation_ratingFeedback_1 = require("./validation.ratingFeedback");
const router = express_1.default.Router();
router
    .route('/')
    // This route is open
    .get(constroller_ratingFeedback_1.RatingFeedBackController.getAllRatingFeedBack)
    .post((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), (0, validateRequestZod_1.default)(validation_ratingFeedback_1.RatingFeedbackValidation.createRatingFeedbackZodSchema), constroller_ratingFeedback_1.RatingFeedBackController.createRatingFeedBack);
router
    .route('/:id')
    // This route is open
    .get(constroller_ratingFeedback_1.RatingFeedBackController.getSingleRatingFeedBack)
    .patch((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), (0, validateRequestZod_1.default)(validation_ratingFeedback_1.RatingFeedbackValidation.updateRatingFeedbackZodSchema), constroller_ratingFeedback_1.RatingFeedBackController.updateRatingFeedBack)
    .delete((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), constroller_ratingFeedback_1.RatingFeedBackController.deleteRatingFeedBack);
exports.RatingFeedBackRoute = router;
