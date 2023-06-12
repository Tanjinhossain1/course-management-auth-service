import { z } from 'zod';

export const academicFacultySchemaValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title Is Required',
    }),
  }),
});

export const updateAcademicFacultySchemaValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title Is Required',
      })
      .optional(),
  }),
});
