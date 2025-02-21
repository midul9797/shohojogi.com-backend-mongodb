import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';

const createUserInDB = async (user: IUser): Promise<IUser | null> => {
  user.role = 'customer';
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }
  return createdUser;
};
const getUsersFromDB = async (): Promise<IUser[] | null> => {
  const users = await User.find();
  if (!users) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return users;
};
const getOneUserFromDB = async (id: string): Promise<IUser | null> => {
  const users = await User.findOne({ _id: id });
  if (!users) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return users;
};
const updateUserInDB = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return result;
};
const deleteUserFromDB = async (id: string): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ _id: id });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete');
  return result;
};
const getMyProfileFromDB = async (
  id: string
): Promise<Partial<IUser | null>> => {
  const result = await User.findOne(
    { _id: id },
    {
      first_name: 1,
      last_name: 1,
      contactNo: 1,
      address: 1,
      _id: 0,
      profileImg: 1,
      email: 1,
    }
  );
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get profile');
  }
  return result;
};
const updateProfileInDB = async (
  id: string,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    //Tried this but still id was showing
    // projection: {
    //   name: 1,
    //   _id: 0,
    //   phoneNumber: 1,
    //   address: 1,
    // },
    new: true,
  });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update');
  const data = await User.findOne(
    { _id: id },
    {
      first_name: 1,
      last_name: 1,
      contactNo: 1,
      address: 1,
      _id: 0,
      profileImg: 1,
      email: 1,
    }
  );
  return data;
};
export const UserServices = {
  createUserInDB,
  getUsersFromDB,
  getOneUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  getMyProfileFromDB,
  updateProfileInDB,
};
