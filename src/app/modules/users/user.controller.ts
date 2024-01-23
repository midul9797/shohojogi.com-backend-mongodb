import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.createUserInDB(user);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!!!',
    data: result,
  });
});
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUsersFromDB();
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrived successfully!!!',
    data: result,
  });
});
const getOneUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getOneUserFromDB(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived successfully!!!',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await UserServices.updateUserInDB(id, data);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!!!',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!!!',
    data: result,
  });
});
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const result = await UserServices.getMyProfileFromDB(userId);
  sendResponse<Partial<IUser | null>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrived successfully!!!",
    data: result,
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const data = req.body;
  const result = await UserServices.updateProfileInDB(userId, data);
  sendResponse<Partial<IUser | null>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrived",
    data: result,
  });
});
export const UserController = {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateProfile,
};
