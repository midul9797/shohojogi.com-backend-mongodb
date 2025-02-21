/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import User from '../users/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (
  loginData: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;
  const isUserExist = await User.isUserExist(email, 'email');
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to find user');
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  )
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId } = verifyToken;
  const isUserExist = await User.isUserExist(userId, '_id');
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const newAccessToken = jwtHelpers.createToken(
    { _id: isUserExist._id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};
export const AuthServices = {
  loginUser,
  refreshToken,
};
