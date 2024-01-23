import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { servicesValidation } from './services.validation';
import { servicesController } from './services.controller';
import { ENUM_USER_ROLE } from '../../enum/user';
import auth from '../../middlewares/auth';
const router = express.Router();

router
  .post(
    '/create-service',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(servicesValidation.createServicesZodSchema),
    servicesController.createservices
  )
  .get('/:route_name', servicesController.getOneservices)
  .get('/', servicesController.getAllservicess)
  .delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    servicesController.deleteservices
  );

export const ServicesRoutes = router;
