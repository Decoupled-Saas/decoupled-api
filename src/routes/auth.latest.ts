import { Router } from 'express';
import { authController } from '@/controllers/authController';
import { wrapper } from '@/common/utils/wrapper';
import { validateRequest } from '@/common/utils/httpHandlers';
import { AuthRegisterPostSchema, AuthLoginPostSchema } from '@/schemas/authSchema';
import { checkCompany, checkEmail, checkFirstName, checkLastName, checkPass } from '@/validators/authValidator';

const authRouter = Router();
authRouter.post(
  '/register',
  validateRequest(AuthRegisterPostSchema),
  checkFirstName,
  checkLastName,
  checkEmail,
  checkPass,
  checkCompany,
  wrapper(authController.register)
);

authRouter.post('/login', validateRequest(AuthLoginPostSchema), checkEmail, checkPass, wrapper(authController.login));

export default authRouter;
