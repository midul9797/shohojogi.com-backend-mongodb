import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OrderServices } from './orders.service';
import { IOrder } from './orders.interface';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const result = await OrderServices.createOrderInDB(req.body, userId);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as any;
  const result = await OrderServices.getAllOrdersFromDB(userId, role);
  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrived',
    data: result,
  });
});
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as any;
  const { id } = req.params;
  const result = await OrderServices.deleteOrderFromDB(id, userId, role);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrived',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  deleteOrder,
};
