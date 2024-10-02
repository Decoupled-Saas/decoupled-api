import { Router } from 'express';
import { iamController } from '@/controllers/iamController';
import { wrapper } from '@/common/utils/wrapper';
import { validateRequest } from '@/common/utils/httpHandlers';
import { iamCreateRoleSchema } from '@/schemas/iamSchema';
import { checkDescription, checkName } from '@/validators/iamValidator';
import redis from '@/common/utils/redis';

const iamRouter = Router();

iamRouter.get('/roles', redis.route(), wrapper(iamController.getRoles));
iamRouter.post(
  '/roles',
  validateRequest(iamCreateRoleSchema),
  checkName,
  checkDescription,
  wrapper(iamController.createRole)
);
iamRouter.delete('/roles', checkName, wrapper(iamController.deleteRole));
export default iamRouter;
