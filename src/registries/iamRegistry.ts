import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { z } from 'zod';

export const iamRegistry = new OpenAPIRegistry();
iamRegistry.registerPath({
  method: 'get',
  security: [{ bearerAuth: [] }],
  description: 'Get a list of available roles.',
  path: '/iam/roles',
  tags: ['IAM'],
  responses: createApiResponse(z.null(), 'Success')
});
