import { createClient } from 'redis';
import config from '../config';
import { Iservices } from '../app/modules/services/services.interface';

const redisClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', error => console.log('RedisError', error));
redisClient.on('connect', error => console.log('Redis Connected'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
};

const setServices = async (service: string): Promise<void> => {
  const key = 'shohojogi.com-services';
  await redisClient.lPush(key, service);
  await redisClient.expire(key, Number(config.redis.expires_in));

  await redisClient.lTrim(key, 0, 99);
};

const getServices = async (): Promise<Iservices[] | null> => {
  const key = 'shohojogi.com-services';
  const services = await redisClient.lRange(key, 0, -1);
  return services.map(service => JSON.parse(service));
};

const delService = async (serviceId: string): Promise<void> => {
  const key = 'shohojogi.com-services';
  const services = await getServices();
  const filteredServices = services?.filter(
    service => service._id !== serviceId
  );

  await redisClient.del(key);
  if (filteredServices.length > 0) {
    await redisClient.rPush(key, ...filteredServices);
  }
};

const disconnect = async (): Promise<void> => {
  await redisClient.quit();
};

export const RedisClient = {
  connect,

  disconnect,
  setServices,
  getServices,
  delService,
};
