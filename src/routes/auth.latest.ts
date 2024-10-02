import { Router } from 'express';
import { authController } from '@/controllers/authController';
import { wrapper } from '@/common/utils/wrapper';
import { validateRequest } from '@/common/utils/httpHandlers';
import { AuthRegisterPostSchema } from '@/schemas/authSchema';
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

export default authRouter;
