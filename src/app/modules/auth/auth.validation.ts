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

export const refreshTokenZodSchemaValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const changePasswordZodSchemaValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is required',
    }),
    newPassword: z.string({
      required_error: 'New Password Is Required',
    }),
  }),
});
