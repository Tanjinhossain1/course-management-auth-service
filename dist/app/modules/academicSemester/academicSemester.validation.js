'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateAcademicSemesterSchemaValidation =
  exports.academicSemesterSchemaValidation = void 0;
const zod_1 = require('zod');
const academicSemester_constant_1 = require('./academicSemester.constant');
// import { monthsEnum } from './academicSemester.constant';
exports.academicSemesterSchemaValidation = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum([...academicSemester_constant_1.titleEnum], {
      required_error: 'Title Is Required',
    }),
    year: zod_1.z.string({
      required_error: 'Year Is Required',
    }),
    code: zod_1.z.enum([...academicSemester_constant_1.codeEnum], {
      required_error: 'Code Is Required',
    }),
    startMonth: zod_1.z.enum([...academicSemester_constant_1.monthsEnum], {
      required_error: 'Start Month Is Required',
    }),
    endMonth: zod_1.z.enum([...academicSemester_constant_1.monthsEnum], {
      required_error: 'Start Month Is Required',
    }),
  }),
});
exports.updateAcademicSemesterSchemaValidation = zod_1.z
  .object({
    body: zod_1.z.object({
      title: zod_1.z
        .enum([...academicSemester_constant_1.titleEnum], {
          required_error: 'Title Is Required',
        })
        .optional(),
      year: zod_1.z
        .string({
          required_error: 'Year Is Required',
        })
        .optional(),
      code: zod_1.z
        .enum([...academicSemester_constant_1.codeEnum], {
          required_error: 'Code Is Required',
        })
        .optional(),
      startMonth: zod_1.z
        .enum([...academicSemester_constant_1.monthsEnum], {
          required_error: 'Start Month Is Required',
        })
        .optional(),
      endMonth: zod_1.z
        .enum([...academicSemester_constant_1.monthsEnum], {
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
