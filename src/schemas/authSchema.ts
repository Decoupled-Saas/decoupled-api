import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import zxcvbn from 'zxcvbn';

extendZodWithOpenApi(z);

export const AuthSchema = z.object({
  id: z.string()
});

export const AuthRegisterSchema = z.object({
  email: z.string().email().openapi({ example: 'jane.doe@here.com' }),
  password: z.string().min(8).openapi({ example: 'Sup3rS3cr3tP@55w0rd' }),
  first_name: z.string().openapi({ example: 'jane' }),
  last_name: z.string().openapi({ example: 'doe' }),
  company: z.string().nullable().optional().openapi({ example: 'my company' })
});

export const AuthLoginSchema = z.object({
  email: z.string().email().openapi({ example: 'jane.doe@here.com' }),
  password: z.string().min(8).openapi({ example: 'Sup3rS3cr3tP@55w0rd' })
});

export const AuthRegisterPostSchema = z.object({
  body: z.object({
    email: z.string().email().openapi({ example: 'jane.doe@here.com' }),
    password: z
      .string()
      .min(8)
      .openapi({ example: 'Sup3rS3cr3tP@55w0rd' })
      .refine((data) => {
        const { score, feedback } = zxcvbn(data);
        if (score < 2) {
          return false;
        }
        return data;
      }),
    first_name: z.string().openapi({ example: 'jane' }),
    last_name: z.string().openapi({ example: 'doe' }),
    company: z.string().nullable().optional().openapi({ example: 'my company' })
  })
});

export const AuthLoginPostSchema = z.object({
  body: z.object({
    email: z.string().email().openapi({ example: 'jane.doe@here.com' }),
    password: z
      .string()
      .min(8)
      .openapi({ example: 'Sup3rS3cr3tP@55w0rd' })
      .refine((data) => {
        const { score, feedback } = zxcvbn(data);
        if (score < 2) {
          return false;
        }
        return data;
      })
  })
});
