import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelpers } from '../../helper/jwtHelpers';
import ApiError from '../errors/ApiError';

const authMiddleware =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      let verifiedUser = null;
      const token = req.headers.authorization;
      
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
      }
      // verify token only general user

      if (token) {
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret
        );
      }

      req.user = verifiedUser;

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access');
      }

    
      next();
    } catch (error) {
      next(error);
    }
  };

export default authMiddleware;
