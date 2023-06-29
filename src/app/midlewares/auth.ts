import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { verifyToken } from '../../helper/createJwtToken';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get and authorized token
      const getToken = req.headers.authorization;
      if (!getToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized');
      }

      // verify token
      let verifiedToken = null;
      try {
        verifiedToken = verifyToken(
          getToken,
          config.jwt.jwt_access_secret as Secret
        );
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
      }

      req.user = verifiedToken;

      if (requiredRoles.length && !requiredRoles.includes(verifiedToken.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
