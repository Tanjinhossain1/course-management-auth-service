import { z } from 'zod';

export const academicDepartmentSchemaValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title Is Required',
    }),
    academicFaculty: z.string({
      required_error: 'academic Faculty Is Required',
    }),
  }),
});

export const updateAcademicDepartmentSchemaValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title Is Required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'academic Faculty Is Required',
      })
      .optional(),
  }),
});
