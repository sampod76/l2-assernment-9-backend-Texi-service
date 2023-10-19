// import { Model } from 'mongoose'

import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';

import { IGeneralUser } from '../generalUser/generalUser.interface';
import { ISuperAdmin } from '../superAdmin/superAdmin.interface';

export type IUser = {
  email: string;
  role: string;
  password: string;
  needsPasswordChange?: true | false;
  generalUser?: Types.ObjectId | IGeneralUser;
  superAdmin?: Types.ObjectId | ISuperAdmin;
  admin?: Types.ObjectId | IAdmin;
};


export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<
    IUser,
    'email' | 'password' | 'needsPasswordChange' | 'role'
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

