"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicFacultySchemaValidation = exports.academicFacultySchemaValidation = void 0;
const zod_1 = require("zod");
exports.academicFacultySchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title Is Required',
        }),
    }),
});
exports.updateAcademicFacultySchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title Is Required',
        })
            .optional(),
    }),
});
