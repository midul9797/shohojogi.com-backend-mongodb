import { Schema, model } from 'mongoose';
import { IOrder, OrdersModel } from './orders.interface';

const orderSchema = new Schema<IOrder, OrdersModel>({
  delivery_time: { type: String, required: true },
  service: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  order_details: { type: String, required: true },
  subtotal: { type: Number, required: true },
  delivery_fee: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  note: { type: String },
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
});
export const Order = model<IOrder, OrdersModel>('Order', orderSchema);
