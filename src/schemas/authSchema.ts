import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import zxcvbn from 'zxcvbn';
import jwt from 'jsonwebtoken';
extendZodWithOpenApi(z);

export const AuthSchema = z.object({
  access: z.object({
    token: z.string().openapi({
      example:
        'eyJ0eXBlIjoiand0IiwiYWxnIjoiUlMyNTYiLCJraWQiOiJDc2pFVHFxdUpRYTRFdWNMdVFVWWZNanE5ZlVEQ3FLa3lsYWVkLXg2ZGRFIn0' +
        '.eyJleHAiOjE3MjgxMjY3MjAsImlhdCI6MTcyODA0MDMyMCwic3ViIjoidGVzdCJ9' +
        '.aAGKe-m2-gITbbTPXaEEGUCH_TSi41EazkLVV6yTH-s2l8EBqT3PL4K05fx8nQywB0UAxc3bf6XMb3_yxi0nOLgcZsLBjzQcaeM8MQi-QPEAbHp0csuB-TIpeOTR_EIVXuwW6ZmmODeIgASlQWOkNfJmBm-Fbrh9gc6EpjcouqceGMowPDlcwb06BRQVoAbArt_7ZFJMXC7QNVMCYAtiMBc7KozDq1XTgmg4GfWXUbuQ6-VEqUR6HZQupzlTMSosxcRDLMoXUxIIzHmxVgjsyHWUavTxWcxfivegeWvNWpHeHrKytdQCE5JVfqRcPThB4a2U2OTfcRychRTpc_lGzA'
    }),
    expires: z.date().openapi({ example: '2024-10-01T12:00:00.000Z' })
  }),
  refreshToken: z.object({
    token: z.string().openapi({
      example:
        'eyJ0eXBlIjoiand0IiwiYWxnIjoiUlMyNTYiLCJraWQiOiJMeS10NDdxZkRCSTd4S1VWeHYtaWFuWEgtMW1XNlY2TXZZSkVZTzZyRzdnIn0' +
        '.eyJleHAiOjE3MjgxMjY3MjAsImlhdCI6MTcyODA0MDMyMCwic3ViIjoidGVzdCJ9' +
        '.hUrr-nOQp0k5yp4S-ZYSAwJhaxNGxf5eWTZDFqx2cQmBUBXiqL1v8O-HkLA9h6_vHNOmBtFyW8Mg1Ww5KAknlFUs9rbfU-5-J_SPSWFT6EF5htBdByUqRvxXdZFmWyRMJpcWcJyPRoYmLVCPwYYHRUIFsZnoKU_ZowPRE1Ro1kwQ4gW9VxVZpQUonp4zLH4TKx-peAw1F_x9_0O4AqulBk9Udume2aMUNIrbJ5Yb2fxFXOcu2hmx67_nLAGblKOmfoDEy5xJGIl8v1zFfXTg27TthjRq-RhzsXdamUPw-Li33xPDbGRCEy47eDnVBYvqd7mLWtri6Wdx--V99qyeJw'
    }),
    expires: z.date().openapi({ example: '2024-10-08T12:00:00.000Z' })
  })
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
