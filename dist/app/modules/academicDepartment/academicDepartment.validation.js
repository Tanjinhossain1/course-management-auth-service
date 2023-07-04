'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateAcademicDepartmentSchemaValidation =
  exports.academicDepartmentSchemaValidation = void 0;
const zod_1 = require('zod');
exports.academicDepartmentSchemaValidation = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Title Is Required',
    }),
    academicFaculty: zod_1.z.string({
      required_error: 'academic Faculty Is Required',
    }),
  }),
});
exports.updateAcademicDepartmentSchemaValidation = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z
      .string({
        required_error: 'Title Is Required',
      })
      .optional(),
    academicFaculty: zod_1.z
      .string({
        required_error: 'academic Faculty Is Required',
      })
      .optional(),
  }),
});
