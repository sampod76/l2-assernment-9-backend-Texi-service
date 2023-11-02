"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequestZod_1 = __importDefault(require("../../middlewares/validateRequestZod"));
const constroller_blog_1 = require("./constroller.blog");
const validation_blog_1 = require("./validation.blog");
const router = express_1.default.Router();
router
    .route('/')
    // This route is open
    .get(constroller_blog_1.BlogController.getAllBlog)
    .post((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(validation_blog_1.BlogValidation.createBlogZodSchema), constroller_blog_1.BlogController.createBlog);
router
    .route('/:id')
    // This route is open
    .get(constroller_blog_1.BlogController.getSingleBlog)
    .patch((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequestZod_1.default)(validation_blog_1.BlogValidation.updateBlogZodSchema), constroller_blog_1.BlogController.updateBlog)
    .delete((0, authMiddleware_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SUPER_ADMIN), constroller_blog_1.BlogController.deleteBlog);
exports.BlogRoute = router;
