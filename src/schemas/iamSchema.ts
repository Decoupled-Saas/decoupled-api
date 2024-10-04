import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import moment from 'moment';

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

export const iamGetJWTSchema = z.object({
  access_keys: z.object({
    keys: z.array(
      z.object({
        kty: z.string().openapi({ example: 'RSA' }),
        kid: z.string().openapi({ example: 'CsjETqquJQa4EucLuQUYfMjq9fUDCqKkylaed-x6ddE' }),
        use: z.string().openapi({ example: 'sig' }),
        alg: z.string().openapi({ example: 'RS256' }),
        e: z.string().openapi({ example: 'AQAB' }),
        n: z
          .string()
          .openapi({
            example:
              'qLeOSI0297_OUmrqf6W1p1bk3AYxcUCds66pthEU_BuS1V5uJrBDzA3nWYbX6jYAvcwJaMtQqRQHV3cl3unbql5clMZ30Gfn4qvSdzhL2mWUPfYbhKex4YExU6jXy86LJR-ftsqS3K7-5rEqpdNq2wV39bknCzu0_J40mY686phk-frqephyO440sSw6nAfHtSWIAQUtL1KO66RLC2k9wVKm5tp4bJ6ld89ioYZjHkP8HywTldebBJM3cS8BJrkdqRwLgaDFNxL9uz3rkkiteSDJ-42sv4Uk1eWj3ARCn-ml6cAtKBxpke0XZV0t5MuSKZSvqc5qGzbqgX7P4-3CJQ'
          })
      })
    )
  }),
  refresh_keys: z.object({
    keys: z.array(
      z.object({
        kty: z.string().openapi({ example: 'RSA' }),
        kid: z.string().openapi({ example: 'Ly-t47qfDBI7xKUVxv-ianXH-1mW6V6MvYJEYO6rG7g' }),
        use: z.string().openapi({ example: 'sig' }),
        alg: z.string().openapi({ example: 'RS256' }),
        e: z.string().openapi({ example: 'AQAB' }),
        n: z
          .string()
          .openapi({
            example:
              'rFBFeP2j1jbp3mCCuCuNh66z1Fc_QLGQIvtdoHpGwpLucrsd_FFF3Iuo3ca1HxtjTKIBmaF_7rrsxHA4I7e-ex4RJCQB9RBaQWjNMjsL6iwSW3GNfwgiNmCvjIx_mcKgDLdlh6GbzLA26z8taAyyKY4wOUnDyvT8qPmnf9rQOcevcSiH5z5-zUwPCIx8E6Q8YXOlWiAeNxYGTMWGPOiOBAiYPiHQAJxPQ4bpYUcPbn1Iaq_uvNl3meVa5_zxjh6eHuyNuRkMnEaapDDM6U_Zz57tbH80Do30c_Iv4gnt0ppOH7dQh1kxwdz3HWGUvq_RPKUGvPODkc7uEQX9LyedSw'
          })
      })
    )
  })
});

export const iamGetJWTToken = z.object({
  access_key: z
    .string()
    .openapi({
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }),
  refresh_key: z
    .string()
    .openapi({
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    })
});

export const iamPostVerifySchema = z.object({
  exp: z.string().openapi({ example: moment().unix() }),
  iat: z.string().openapi({ example: moment().add(7, 'days').unix() }),
  sub: z.string().openapi({ example: 'test' })
});

export const iamTestToken = z.object({
  access_key: z.string()
});

export const iamPostTestToken = z.object({
  body: z.object({
    access_key: z.string()
  })
});
