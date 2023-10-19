import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { Schema } from 'mongoose';
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import ApiError from '../../errors/ApiError';
import { IUser } from '../users/users.interface';
import { User } from '../users/users.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUserFromDb = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email) as IUser & {_id:Schema.Types.ObjectId};

  //chack user
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //match password
  if (!(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const allData=await User.findOne({email}).populate([
    {
      path:'admin'
    },
    {
      path:'generalUser'
    },
    {
      path:'superAdmin'
    }
  ])



  const accessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role,
      otherData:allData
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    
  };
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  //chack this user exist database
  const isUserExist = await User.isUserExist(verifiedToken?.userId)as IUser & {_id:Schema.Types.ObjectId};
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUserFromDb,
  refreshToken,
};
