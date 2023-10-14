import express from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/route.academicDepartment';
import { AcademicFacultyRoute } from '../modules/academicFaculty/route.academicFaculty';
import { AcademicSemesterRoute } from '../modules/academicSemester/route.academicSemester';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRouter } from '../modules/auth/auth.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';

import { UserRoute } from '../modules/users/users.router';
import { GeneralUserRoutes } from '../modules/generalUser/generalUser.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-facultys',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/general-user',
    route: GeneralUserRoutes,
  },
 
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
