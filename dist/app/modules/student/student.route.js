"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = require("../../midlewares/validateRequest");
const student_validation_1 = require("./student.validation");
const studentRouter = express_1.default.Router();
studentRouter.get('/:id', student_controller_1.getSingleAccountStudentsController);
studentRouter.patch('/:id', (0, validateRequest_1.ValidationRequest)(student_validation_1.updateStudentZodSchema), student_controller_1.updateSingleAccountStudentsController);
studentRouter.get('/', student_controller_1.getAllStudentController);
studentRouter.delete('/:id', student_controller_1.deleteSingleStudent);
exports.default = studentRouter;
