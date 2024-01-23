/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminServices } from './admin.service';
import { IUser } from '../users/user.interface';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AdminServices.createAdminInDB(email);

  sendResponse<Partial<IUser | null>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!!!',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
};
