import { Model } from 'mongoose';
export type IUserRole = 'admin' | 'customer';
export type IUser = {
  _id?: string;
  contactNo?: string;
  role: IUserRole;
  password: string;
  email: string;
  first_name: string;
  last_name: string;

  address?: {
    house: string;
    block: string;
    ward: string;
    road: string;
    zip: string;
    city: string;
  };
  profileImg?: string;
};

export type UserModel = {
  isUserExist(value: string, field: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
