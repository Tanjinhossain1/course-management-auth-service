import { z } from 'zod';

export const authZodSchemaValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id Is Required',
    }),
    password: z.string({
      required_error: 'Password Is Required',
    }),
  }),
});
