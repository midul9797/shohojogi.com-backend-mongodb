import { Model } from 'mongoose';

export type IOrder = {
  customer?: string;
  delivery_time: string;
  service: string;
  contact: string;
  address: string;
  order_details: string;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  note: string;
};
export type OrdersModel = Model<IOrder>;
