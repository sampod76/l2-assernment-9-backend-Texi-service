'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
// cwd = current working directory (অর্থাৎ আমরা এখন যে পাইলে আছি এটা)
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') }); // এখানে ২ টা জয়েন করে দিয়েছে
exports.default = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  // database_url: process.env.DATABASE_URL_COMPASS,
  database_url: process.env.DATABASE_URL_ATLAS,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
};
