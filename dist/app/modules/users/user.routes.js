'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const user_controller_1 = require('./user.controller');
const validateRequest_1 = require('../../midlewares/validateRequest');
const user_validation_1 = require('./user.validation');
const usersRouter = express_1.default.Router();
usersRouter.post(
  '/create-student',
  (0, validateRequest_1.ValidationRequest)(
    user_validation_1.userSchemaValidation
  ),
  user_controller_1.createStudentController
);
exports.default = usersRouter;
