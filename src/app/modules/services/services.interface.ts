import { Model } from 'mongoose';

export type Iservices = {
  name: string;
  route_name?: string;
  first_banner_img: string;
  second_banner_img: string;
  thumbnail: string;
  taglines: string[];
  options: {
    name: string;
    price: string;
  }[];

  service_details: string;
  faq: {
    question: string;
    answer: string;
  }[];
};

export type servicesModel = Model<Iservices>;
