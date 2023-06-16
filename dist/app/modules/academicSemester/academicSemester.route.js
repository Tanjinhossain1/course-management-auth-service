"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../midlewares/validateRequest");
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const academicSemesterRouter = express_1.default.Router();
academicSemesterRouter.post('/create-semester', (0, validateRequest_1.ValidationRequest)(academicSemester_validation_1.academicSemesterSchemaValidation), academicSemester_controller_1.createAcademicSemesterController);
academicSemesterRouter.get('/:id', academicSemester_controller_1.getSingleAccountSemestersController);
academicSemesterRouter.patch('/:id', (0, validateRequest_1.ValidationRequest)(academicSemester_validation_1.updateAcademicSemesterSchemaValidation), academicSemester_controller_1.updateSingleAccountSemestersController);
academicSemesterRouter.delete('/:id', academicSemester_controller_1.deleteAcademicSemester);
academicSemesterRouter.get('/', academicSemester_controller_1.getAllAccountSemestersController);
exports.default = academicSemesterRouter;
