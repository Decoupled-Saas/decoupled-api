import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { z } from 'zod';
import {
  iamGetJWTSchema,
  iamGetJWTToken,
  iamPostTestToken,
  iamPostVerifySchema,
  iamRoleDeleteSchema,
  iamRoleSchema,
  iamTestToken
} from '@/schemas/iamSchema';
import { StatusCodes } from 'http-status-codes';
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

iamRegistry.registerPath({
  method: 'get',
  path: '/iam/jwk',
  tags: ['IAM JWK'],
  responses: createApiResponse(iamGetJWTSchema, 'JWK', StatusCodes.OK)
});

iamRegistry.registerPath({
  method: 'get',
  path: '/iam/token',
  tags: ['IAM JWK'],
  responses: createApiResponse(iamGetJWTToken, 'test tokens', StatusCodes.OK)
});

iamRegistry.registerPath({
  method: 'post',
  path: '/iam/verify',
  tags: ['IAM JWK'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: iamTestToken
        }
      }
    }
  },
  responses: createApiResponse(iamPostVerifySchema, 'test tokens validation', StatusCodes.OK)
});
