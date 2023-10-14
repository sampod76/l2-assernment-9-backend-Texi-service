import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/users';
import ApiError from '../../errors/ApiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

import { IUser } from './users.interface';
import { User } from './users.model';

import { IGeneralUser } from '../generalUser/generalUser.interface';
import { GeneralUser } from '../generalUser/generalUser.model';
import { ISuperAdmin } from '../superAdmin/superAdmin.interface';
import { SuperAdmin } from '../superAdmin/superAdmin.model';

const createGeneralUserFromdb = async (
  generalUser: IGeneralUser,
  user: IUser
): Promise<IUser | null> => {
  //auto generate user id

  // auto set user password

  user.role = ENUM_USER_ROLE.GENERAL_USER;
  generalUser.email=user.email;

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    

    //array
    const newGeneralUser = await GeneralUser.create([generalUser], { session });
    if (!newGeneralUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create GeneralUser');
    }
    //set GeneralUser -->  _id into user.GeneralUser
    user.generalUser = newGeneralUser[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();

    //user --> GeneralUser ---> academicSemester, academicDepartment , academicFaculty
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id })
  }

  return newUserAllData;
};

const createAdminFromDb = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  
  user.role = ENUM_USER_ROLE.ADMIN;

  admin.email=user.email;
  //Generater admin id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
  
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    //user to ref admin id
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id })
  }

  return newUserAllData;
};

const createSuperAdminFromDb = async (
  admin: ISuperAdmin,
  user: IUser
): Promise<IUser | null> => {
  
  user.role = ENUM_USER_ROLE.SUPER_ADMIN;

  admin.email=user.email;
  //Generater admin id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
  
    const newAdmin = await SuperAdmin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    //user to ref admin id
    user.supperAdmin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });
    console.log("🚀 ~ file: users.service.ts:127 ~ newUser:", newUser)
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id })
  }
  
  console.log("🚀 ~ file: users.service.ts:140 ~ newUserAllData:", newUserAllData)
  return newUserAllData;
};



export const UserServices = {
  createGeneralUserFromdb,
  createAdminFromDb,
  createSuperAdminFromDb
 
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
