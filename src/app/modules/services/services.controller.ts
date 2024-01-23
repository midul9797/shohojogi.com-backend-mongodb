import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Iservices } from './services.interface';
import { servicesServices } from './services.service';

const createservices = catchAsync(async (req: Request, res: Response) => {
  const services = req.body;
  const result = await servicesServices.createServiceInDB(services);
  sendResponse<Iservices>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service created successfully',
    data: result,
  });
});
const getAllservicess = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesServices.getAllServicesFromDB();
  sendResponse<Iservices[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'servicess retrived',
    data: result,
  });
});
const getOneservices = catchAsync(async (req: Request, res: Response) => {
  const { route_name } = req.params;
  const result = await servicesServices.getOneServiceFromDB(route_name);
  sendResponse<Iservices>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'services retrived',
    data: result,
  });
});

const deleteservices = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await servicesServices.deleteServiceFromDB(id);
  sendResponse<Iservices>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'services deleted successfully!!!',
    data: result,
  });
});

export const servicesController = {
  createservices,
  getAllservicess,
  getOneservices,
  deleteservices,
};
