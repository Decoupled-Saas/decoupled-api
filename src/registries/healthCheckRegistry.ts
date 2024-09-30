import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

export const healthCheckRegistry = new OpenAPIRegistry();
healthCheckRegistry.registerPath({
  method: 'get',
  path: '/health',
  tags: ['Health Check'],
  responses: createApiResponse(z.null(), 'Success')
});
