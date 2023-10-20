"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_route_1 = require("../modules/booking/booking.route");
const route_category_1 = require("../modules/category/route.category");
const route_fileUploade_1 = require("../modules/fileUploade/route.fileUploade");
const generalUser_route_1 = require("../modules/generalUser/generalUser.route");
const service_route_1 = require("../modules/service/service.route");
const users_router_1 = require("../modules/users/users.router");
const route_ratingFeedback_1 = require("../modules/ratingFeedback/route.ratingFeedback");
const route_blog_1 = require("../modules/blog/route.blog");
const route_faq_1 = require("../modules/faq/route.faq");
const superAdmin_route_1 = require("../modules/superAdmin/superAdmin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: users_router_1.UserRoute,
    },
    {
        path: '/general-user',
        route: generalUser_route_1.GeneralUserRoutes,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoute,
    },
    {
        path: '/category',
        route: route_category_1.CategoryRoute,
    },
    {
        path: '/booking',
        route: booking_route_1.BookingRoute,
    },
    {
        path: '/rating-feedback',
        route: route_ratingFeedback_1.RatingFeedBackRoute,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/super-admin',
        route: superAdmin_route_1.SuperAdminRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRouter,
    },
    {
        path: '/upload',
        route: route_fileUploade_1.FileUploadeRoute,
    },
    {
        path: '/blogs',
        route: route_blog_1.BlogRoute,
    },
    {
        path: '/faq',
        route: route_faq_1.FaqRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
