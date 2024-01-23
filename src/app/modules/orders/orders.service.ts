/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Order } from './orders.model';
import { IOrder } from './orders.interface';

const createOrderInDB = async (
  data: IOrder,
  userId: string
): Promise<IOrder | null> => {
  const result = (await Order.create({ ...data, customer: userId })).populate(
    'customer'
  );
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  return result;
};
const getAllOrdersFromDB = async (
  id: string,
  role: string
): Promise<IOrder[] | null> => {
  let result;
  if (role === 'admin') {
    result = await Order.find().populate('customer');
  } else if (role === 'customer') {
    result = await Order.find({ customer: id }).populate('customer');
  }
  if (!result)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrive orders');
  return result;
};
const deleteOrderFromDB = async (
  orderId: string,
  userId: string,
  role: string
): Promise<IOrder | null> => {
  let result;
  if (role === 'admin') result = await Order.findOneAndDelete({ _id: orderId });
  else if (role === 'customer') {
    const res = await Order.findOne({ _id: orderId, customer: userId });
    if (!res) throw new ApiError(httpStatus.FORBIDDEN, 'Not allowed to delete');
    result = await Order.findOneAndDelete({ _id: orderId });
  }
  if (!result)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrive orders');
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  deleteOrderFromDB,
};
