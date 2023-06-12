import { z } from 'zod';
import { codeEnum, monthsEnum, titleEnum } from './academicSemester.constant';
// import { monthsEnum } from './academicSemester.constant';

export const academicSemesterSchemaValidation = z.object({
  body: z.object({
    title: z.enum([...titleEnum] as [string, ...string[]], {
      required_error: 'Title Is Required',
    }),
    year: z.string({
      required_error: 'Year Is Required',
    }),
    code: z.enum([...codeEnum] as [string, ...string[]], {
      required_error: 'Code Is Required',
    }),
    startMonth: z.enum([...monthsEnum] as [string, ...string[]], {
      required_error: 'Start Month Is Required',
    }),
    endMonth: z.enum([...monthsEnum] as [string, ...string[]], {
      required_error: 'Start Month Is Required',
    }),
  }),
});
export const updateAcademicSemesterSchemaValidation = z
  .object({
    body: z.object({
      title: z
        .enum([...titleEnum] as [string, ...string[]], {
          required_error: 'Title Is Required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year Is Required',
        })
        .optional(),
      code: z
        .enum([...codeEnum] as [string, ...string[]], {
          required_error: 'Code Is Required',
        })
        .optional(),
      startMonth: z
        .enum([...monthsEnum] as [string, ...string[]], {
          required_error: 'Start Month Is Required',
        })
        .optional(),
      endMonth: z
        .enum([...monthsEnum] as [string, ...string[]], {
          required_error: 'Start Month Is Required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either Both Title and Code Should Be Provided Or Neither ',
    }
  );
