'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const validateRequest_1 = require('../../midlewares/validateRequest');
const academicDepartment_controller_1 = require('./academicDepartment.controller');
const academicDepartment_validation_1 = require('./academicDepartment.validation');
const academicDepartmentRouter = express_1.default.Router();
academicDepartmentRouter.post(
  '/create-department',
  (0, validateRequest_1.ValidationRequest)(
    academicDepartment_validation_1.academicDepartmentSchemaValidation
  ),
  academicDepartment_controller_1.createAcademicDepartmentController
);
academicDepartmentRouter.get(
  '/:id',
  academicDepartment_controller_1.getSingleAccountDepartmentController
);
academicDepartmentRouter.patch(
  '/:id',
  (0, validateRequest_1.ValidationRequest)(
    academicDepartment_validation_1.updateAcademicDepartmentSchemaValidation
  ),
  academicDepartment_controller_1.updateSingleAccountDepartmentController
);
academicDepartmentRouter.delete(
  '/:id',
  academicDepartment_controller_1.deleteAcademicDepartment
);
academicDepartmentRouter.get(
  '/',
  academicDepartment_controller_1.getAllAccountDepartmentController
);
exports.default = academicDepartmentRouter;
