import express from 'express';

import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRouter } from '../modules/auth/auth.route';


import { BookingRoute } from '../modules/booking/booking.route';
import { CategoryRoute } from '../modules/category/route.category';
import { FileUploadeRoute } from '../modules/fileUploade/route.fileUploade';
import { GeneralUserRoutes } from '../modules/generalUser/generalUser.route';
import { ServiceRoute } from '../modules/service/service.route';
import { UserRoute } from '../modules/users/users.router';
import { RatingFeedBackRoute } from '../modules/ratingFeedback/route.ratingFeedback';
import { BlogRoute } from '../modules/blog/route.blog';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  
  {
    path: '/general-user',
    route: GeneralUserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoute,
  },
  {
    path: '/category',
    route: CategoryRoute,
  },
  {
    path: '/booking',
    route: BookingRoute,
  },
  {
    path: '/rating-feedback',
    route: RatingFeedBackRoute,
  },
 
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/services',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/upload',
    route: FileUploadeRoute,
  },
  {
    path: '/blogs',
    route: BlogRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
