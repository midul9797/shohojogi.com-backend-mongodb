import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import User from '../users/user.model';
import { IUser } from '../users/user.interface';

const createAdminInDB = async (
  email: string
): Promise<Partial<IUser | null>> => {
  const createdAdmin = await User.findOneAndUpdate(
    { email: email },
    { role: 'admin' },
    { projection: { _id: 0, password: 0 }, new: true }
  );
  if (!createdAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }
  return createdAdmin;
};

export const AdminServices = {
  createAdminInDB,
};
