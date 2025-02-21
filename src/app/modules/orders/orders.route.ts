import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './orders.validation';
import { OrderController } from './orders.controller';
import { ENUM_USER_ROLE } from '../../enum/user';
import auth from '../../middlewares/auth';
const router = express.Router();

router
  .post(
    '/create-order',
    auth(ENUM_USER_ROLE.CUSTOMER),
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder
  )

  .get(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    OrderController.getAllOrders
  )
  .delete(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    OrderController.deleteOrder
  );

export const OrderRoutes = router;
