import express from 'express';
import { UserValidation } from '../users/user.validation';
import { UserController } from '../users/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();
router
  .post(
    '/signup',
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  )
  .post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser
  )
  .post(
    '/refresh-token',
    // validateRequest(AuthValidation.refreshTokenZodSchema),
    AuthController.refreshToken
  );

export const AuthRoute = router;
