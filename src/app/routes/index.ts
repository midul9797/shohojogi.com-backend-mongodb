import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { ServicesRoutes } from '../modules/services/services.route';
import { OrderRoutes } from '../modules/orders/orders.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServicesRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
