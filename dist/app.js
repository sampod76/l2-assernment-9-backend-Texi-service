"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import usersService from './app/modules/users/users.service'
const app = (0, express_1.default)();
// app.use(cors());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const path_1 = __importDefault(require("path"));
const index_route_1 = __importDefault(require("./app/routes/index_route"));
/* app.get('/', async (req: Request, res: Response) => {
  res.send('server is running');
}); */
// console.log(app.get('env')); //-->development
//Application route
app.use('/api/v1', index_route_1.default);
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../uploadFile/images/')));
/* app.use('/api/v1/users', UserRoute);
app.use('/api/v1/academic-semesters', AcademicSemesterRoute); */
// global error handlar
app.use(globalErrorHandler_1.default);
//handle not found route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).send({
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
exports.default = app;
