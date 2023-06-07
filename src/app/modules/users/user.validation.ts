import { z } from 'zod'

export const userSchemaValidation = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role Is Required',
    }),
    password: z.string().optional(),
  }),
})
