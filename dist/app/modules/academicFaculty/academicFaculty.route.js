'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const validateRequest_1 = require('../../midlewares/validateRequest');
const academicFaculty_controller_1 = require('./academicFaculty.controller');
const academicFaculty_validation_1 = require('./academicFaculty.validation');
const academicFacultyRouter = express_1.default.Router();
academicFacultyRouter.post(
  '/create-faculty',
  (0, validateRequest_1.ValidationRequest)(
    academicFaculty_validation_1.academicFacultySchemaValidation
  ),
  academicFaculty_controller_1.createAcademicFacultyController
);
academicFacultyRouter.get(
  '/:id',
  academicFaculty_controller_1.getSingleAccountFacultyController
);
academicFacultyRouter.patch(
  '/:id',
  (0, validateRequest_1.ValidationRequest)(
    academicFaculty_validation_1.updateAcademicFacultySchemaValidation
  ),
  academicFaculty_controller_1.updateSingleAccountFacultyController
);
academicFacultyRouter.delete(
  '/:id',
  academicFaculty_controller_1.deleteAcademicFaculty
);
academicFacultyRouter.get(
  '/',
  academicFaculty_controller_1.getAllAccountFacultyController
);
exports.default = academicFacultyRouter;
