import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const iamCreateRoleSchema = z.object({
  body: z.object({
    name: z.string().openapi({ example: 'admin' }),
    description: z.string().openapi({ example: 'Admin role' })
  })
});

export const iamRoleSchema = z.object({
  name: z.string().openapi({ example: 'test' }),
  description: z.string().openapi({ example: 'Test role' })
});

export const iamRoleDeleteSchema = z.object({
  name: z.string().openapi({ example: 'test' })
});
