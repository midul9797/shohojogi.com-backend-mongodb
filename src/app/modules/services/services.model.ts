import { Schema, model } from 'mongoose';
import { servicesModel, Iservices } from './services.interface';

const servicesSchema = new Schema<Iservices, servicesModel>({
  name: { type: String, required: true },
  first_banner_img: { type: String, required: true },
  second_banner_img: { type: String, required: true },
  route_name: { type: String },
  thumbnail: { type: String },
  taglines: { type: [String], required: true },
  options: { type: [{ name: String, price: String }], required: true },
  service_details: { type: String, required: true },
  faq: {
    type: [
      {
        question: String,
        answer: String,
      },
    ],
    required: true,
  },
});

export const services = model<Iservices, servicesModel>(
  'services',
  servicesSchema
);
