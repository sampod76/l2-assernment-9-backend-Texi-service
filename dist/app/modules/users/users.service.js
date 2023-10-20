"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("../../../enums/users");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const admin_model_1 = require("../admin/admin.model");
const users_model_1 = require("./users.model");
const generalUser_model_1 = require("../generalUser/generalUser.model");
const superAdmin_model_1 = require("../superAdmin/superAdmin.model");
const createGeneralUserFromdb = (generalUser, user) => __awaiter(void 0, void 0, void 0, function* () {
    //auto generate user id
    // auto set user password
    user.role = users_1.ENUM_USER_ROLE.GENERAL_USER;
    generalUser.email = user.email;
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //array
        const newGeneralUser = yield generalUser_model_1.GeneralUser.create([generalUser], { session });
        if (!newGeneralUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create GeneralUser');
        }
        //set GeneralUser -->  _id into user.GeneralUser
        user.generalUser = newGeneralUser[0]._id;
        const newUser = yield users_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
        //user --> GeneralUser ---> academicSemester, academicDepartment , academicFaculty
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield users_model_1.User.findOne({ _id: newUserAllData._id });
    }
    return newUserAllData;
});
const createAdminFromDb = (admin, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = users_1.ENUM_USER_ROLE.ADMIN;
    admin.email = user.email;
    //Generater admin id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        //user to ref admin id
        user.admin = newAdmin[0]._id;
        const newUser = yield users_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield users_model_1.User.findOne({ _id: newUserAllData._id });
    }
    return newUserAllData;
});
const createSuperAdminFromDb = (admin, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = users_1.ENUM_USER_ROLE.SUPER_ADMIN;
    admin.email = user.email;
    //Generater admin id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newAdmin = yield superAdmin_model_1.SuperAdmin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        //user to ref admin id
        user.superAdmin = newAdmin[0]._id;
        const newUser = yield users_model_1.User.create([user], { session });
        console.log('🚀 ~ file: users.service.ts:127 ~ newUser:', newUser);
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield users_model_1.User.findOne({ _id: newUserAllData._id });
    }
    console.log('🚀 ~ file: users.service.ts:140 ~ newUserAllData:', newUserAllData);
    return newUserAllData;
});
const getUserByDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findOne({ _id: id }).populate([
        {
            path: 'superAdmin',
            select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
        {
            path: 'generalUser',
            select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
        {
            path: 'admin',
            select: { createdAt: 0, updatedAt: 0, __v: 0 },
        },
    ]);
    return result;
});
const updateRoleByDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield users_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found !');
    }
    const adminData = __rest(payload, []);
    const updatedStudentData = Object.assign({}, adminData);
    const result = yield users_model_1.User.findOneAndUpdate({ _id: id }, updatedStudentData, {
        new: true,
    });
    return result;
});
exports.UserServices = {
    createGeneralUserFromdb,
    createAdminFromDb,
    createSuperAdminFromDb,
    getUserByDb,
    updateRoleByDb
};
/* if (newUserAllData) {
  newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
    path: 'GeneralUser',
    populate: [
      {
        path: 'academicSemester',
        model: 'academic_semester',
      },
      {
        path: 'academicDepartment',
        model: 'academic_Department',
      },
      {
        path: 'academicFaculty',
        model: 'academic_faculty',
      },
    ],
  });
} */
