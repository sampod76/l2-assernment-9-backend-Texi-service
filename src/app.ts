import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
// import usersService from './app/modules/users/users.service'

const app: Application = express();

// app.use(cors());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import path from 'path';
import routers from './app/routes/index_route';

/* app.get('/', async (req: Request, res: Response) => {
  res.send('server is running');
}); */
// console.log(app.get('env')); //-->development

//Application route
app.use('/api/v1', routers);
app.use(
  '/images',
  express.static(path.join(__dirname, '../uploadFile/images/'))
);

/* app.use('/api/v1/users', UserRoute);
app.use('/api/v1/academic-semesters', AcademicSemesterRoute); */

// global error handlar
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    message: 'Not found route',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  });
  next();
});

/* const test = async () => {
  await AcademicDepartment.deleteMany();
  await AcademicFaculty.deleteMany();
  await AcademicSemester.deleteMany();
};
test(); */

export default app;
