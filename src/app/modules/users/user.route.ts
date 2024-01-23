import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
const router = express.Router();
router
  .get(
    '/my-profile',
    auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
    UserController.getMyProfile
  )
  .patch(
    '/my-profile',
    auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
    UserController.updateProfile
  )
  .patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUser
  )
  .delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)
  .get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getOneUser)
  .get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getUsers);

export const UserRoutes = router;
