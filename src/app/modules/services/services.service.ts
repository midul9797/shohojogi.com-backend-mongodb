/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Iservices } from './services.interface';
import { services } from './services.model';
import { RedisClient } from '../../../shared/redis';

const createServiceInDB = async (
  payload: Iservices
): Promise<Iservices | null> => {
  const route_name = payload.name.toLowerCase().replace(' ', '-');
  const createdservices = await services.create({ ...payload, route_name });
  if (!createdservices)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create services');
  await RedisClient.setServices(JSON.stringify(createdservices));
  return createdservices;
};
const getAllServicesFromDB = async (): Promise<Iservices[] | null> => {
  const cache = await RedisClient.getServices();

  let result = null;
  if (cache?.length === 0 || !cache) {
    result = await services.find();
    if (!result)
      throw new ApiError(httpStatus.BAD_REQUEST, 'No Services Found');
    result.forEach(
      async service => await RedisClient.setServices(JSON.stringify(service))
    );
  } else return cache;
  return result;
};
const getOneServiceFromDB = async (
  route_name: string
): Promise<Iservices | null> => {
  const service = await services.findOne({ route_name });
  if (!service)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get services');
  return service;
};

const deleteServiceFromDB = async (
  servicesId: string
): Promise<Iservices | null> => {
  const result = await services.findOneAndDelete({ _id: servicesId });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete');
  return result;
};

export const servicesServices = {
  createServiceInDB,
  getAllServicesFromDB,
  getOneServiceFromDB,
  deleteServiceFromDB,
};
