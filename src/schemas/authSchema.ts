import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z)

export const AuthSchema = z.object({
  id: z.string(),
})

export const CreateUserSchema = z.object({
  email: z.string().email().openapi({example: 'me@here.com'}),
  password: z.string().min(8).openapi({example: 'Sup3rS3cr3tP@55w0rd'}),
  name: z.string().openapi({example: 'my name'}),
  company: z.string().nullable().optional().openapi({example: 'my company'}),
})
