import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { AuthSchema, CreateUserSchema } from '@/schemas/authSchema';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

export const authRegistry = new OpenAPIRegistry()

authRegistry.register("Auth", AuthSchema)
authRegistry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateUserSchema,
        }
      }
    }
  },
  responses: createApiResponse(AuthSchema, "Success")
})
