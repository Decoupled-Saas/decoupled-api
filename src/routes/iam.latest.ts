import { Router } from 'express';
import { iamController } from '@/controllers/iamController';
import { wrapper } from '@/common/utils/wrapper';
import { validateRequest } from '@/common/utils/httpHandlers';
import { iamCreateRoleSchema, iamPostTestToken } from '@/schemas/iamSchema';
import { checkAccessKey, checkAccessToken, checkDescription, checkName } from '@/validators/iamValidator';
import redis from '@/common/utils/redis';
import { auth } from '@/common/middleware/auth';

const iamRouter = Router();

iamRouter.get('/roles', auth('role_get_all'), redis.route(), wrapper(iamController.getRoles));
iamRouter.post(
  '/roles',
  auth('role_add'),
  validateRequest(iamCreateRoleSchema),
  checkName,
  checkDescription,
  wrapper(iamController.createRole)
);
iamRouter.delete('/roles', auth('role_delete'), checkName, wrapper(iamController.deleteRole));

// undocumented to test signing jwt
iamRouter.get('/jwk', wrapper(iamController.getKeys));
iamRouter.get('/token', wrapper(iamController.getTestToken));
iamRouter.post('/verify', validateRequest(iamPostTestToken), checkAccessKey, wrapper(iamController.verifyTestToken));
export default iamRouter;
