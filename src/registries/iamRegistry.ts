import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { z } from 'zod';
import { iamRoleDeleteSchema, iamRoleSchema } from '@/schemas/iamSchema';
import { StatusCodes } from 'http-status-codes';
import { AuthSchema } from '@/schemas/authSchema';
import { authRegistry } from '@/registries/authRegistry';

export const iamRegistry = new OpenAPIRegistry();
authRegistry.register('IAM Routes', iamRoleSchema);

iamRegistry.registerPath({
  method: 'get',
  security: [{ bearerAuth: [] }],
  description: 'Get a list of available roles.',
  path: '/iam/roles',
  tags: ['IAM Roles'],
  responses: createApiResponse(z.null(), 'Success')
});

iamRegistry.registerPath({
  method: 'post',
  security: [{ bearerAuth: [] }],
  path: '/iam/roles',
  tags: ['IAM Roles'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: iamRoleSchema
        }
      }
    }
  },
  responses: createApiResponse(iamRoleSchema, 'Role Created', StatusCodes.CREATED)
});

iamRegistry.registerPath({
  method: 'delete',
  security: [{ bearerAuth: [] }],
  path: '/iam/roles',
  tags: ['IAM Roles'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: iamRoleDeleteSchema
        }
      }
    }
  },
  responses: createApiResponse(iamRoleSchema, 'Role Deleted', StatusCodes.OK)
});
