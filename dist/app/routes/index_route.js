'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const route_academicSemester_1 = require('../modules/academicSemester/route.academicSemester');
const users_router_1 = require('../modules/users/users.router');
const route_academicFaculty_1 = require('../modules/academicFaculty/route.academicFaculty');
const route_academicDepartment_1 = require('../modules/academicDepartment/route.academicDepartment');
const route_student_1 = require('../modules/student/route.student');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: users_router_1.UserRoute,
  },
  {
    path: '/academic-semesters',
    route: route_academicSemester_1.AcademicSemesterRoute,
  },
  {
    path: '/academic-facultys',
    route: route_academicFaculty_1.AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: route_academicDepartment_1.AcademicDepartmentRoute,
  },
  {
    path: '/students',
    route: route_student_1.StudentRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
