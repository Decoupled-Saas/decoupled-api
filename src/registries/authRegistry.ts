import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { AuthLoginSchema, AuthRegisterSchema, AuthSchema } from '@/schemas/authSchema';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

export const authRegistry = new OpenAPIRegistry();

authRegistry.register('Auth', AuthSchema);
authRegistry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT'
});

authRegistry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: AuthRegisterSchema
        }
      }
    }
  },
  responses: createApiResponse(AuthSchema, 'Success')
});

authRegistry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: AuthLoginSchema
        }
      }
    }
  },
  responses: createApiResponse(AuthSchema, 'Success')
});
