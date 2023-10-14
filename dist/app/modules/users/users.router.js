'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require('express'));
const validateRequestZod_1 = __importDefault(
  require('../../middlewares/validateRequestZod')
);
const users_controller_1 = require('./users.controller');
const users_validation_1 = require('./users.validation');
const router = express_1.default.Router();
router
  .route('/student')
  .get()
  .post(
    (0, validateRequestZod_1.default)(
      users_validation_1.UserValidation.createStudentZodSchema
    ),
    users_controller_1.UserController.createStudent
  );
exports.UserRoute = router;
