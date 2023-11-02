"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequestZod_1 = __importDefault(require("../../middlewares/validateRequestZod"));
const booking_constroller_1 = require("./booking.constroller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router
    .route('/')
    .get((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), booking_constroller_1.BookingController.getAllBooking)
    .post((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), (0, validateRequestZod_1.default)(booking_validation_1.BookingValidation.createBookingZodSchema), booking_constroller_1.BookingController.createBooking);
router
    .route('/:id')
    .get((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), booking_constroller_1.BookingController.getSingleBooking)
    .patch((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), (0, validateRequestZod_1.default)(booking_validation_1.BookingValidation.updateBookingZodSchema), booking_constroller_1.BookingController.updateBooking)
    .delete((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN, users_1.ENUM_USER_ROLE.GENERAL_USER), booking_constroller_1.BookingController.deleteBooking);
exports.BookingRoute = router;
