import { z } from 'zod';
import { codeEnum, monthsEnum, titleEnum } from './academicSemester.constant';
// import { monthsEnum } from './academicSemester.constant';

export const academicSemesterSchemaValidation = z.object({
  body: z.object({
    title: z.enum([...titleEnum] as [string, ...string[]], {
      required_error: 'Title Is Required',
    }),
    year: z.number({
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
