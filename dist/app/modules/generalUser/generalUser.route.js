"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralUserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const generalUser_controller_1 = require("./generalUser.controller");
const generalUser_validation_1 = require("./generalUser.validation");
const validateRequestZod_1 = __importDefault(require("../../middlewares/validateRequestZod"));
const router = express_1.default.Router();
router.route('/').get(generalUser_controller_1.GeneralUserController.getAllGeneralUsers);
router
    .route('/:id')
    .get(generalUser_controller_1.GeneralUserController.getSingleGeneralUser)
    .patch((0, validateRequestZod_1.default)(generalUser_validation_1.GeneralUserValidation.updateGeneralUser), generalUser_controller_1.GeneralUserController.updateGeneralUser)
    .delete(generalUser_controller_1.GeneralUserController.deleteGeneralUser);
exports.GeneralUserRoutes = router;
