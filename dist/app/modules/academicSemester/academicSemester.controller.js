"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAcademicSemester = exports.updateSingleAccountSemestersController = exports.getSingleAccountSemestersController = exports.getAllAccountSemestersController = exports.createAcademicSemesterController = void 0;
const academicSemester_service_1 = require("./academicSemester.service");
const clearableAsync_1 = require("../../../shareble/clearableAsync");
const sendResponce_1 = require("../../../shareble/sendResponce");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../../../shareble/pick");
const pagination_1 = require("../../../constants/pagination");
const academicSemester_constant_1 = require("./academicSemester.constant");
exports.createAcademicSemesterController = (0, clearableAsync_1.clearableAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterData = req.body;
    const result = yield (0, academicSemester_service_1.createAcademicSemester)(academicSemesterData);
    (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Semester Create SuccessFully',
        data: result,
    });
}));
exports.getAllAccountSemestersController = (0, clearableAsync_1.clearableAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, academicSemester_constant_1.academicSemesterFilterableFields);
    const paginationOption = (0, pick_1.pick)(req.query, pagination_1.paginationField);
    const result = yield (0, academicSemester_service_1.getAllSemesterServices)(filters, paginationOption);
    (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuccessFully Getting Semester ',
        paginated: result === null || result === void 0 ? void 0 : result.paginated,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
exports.getSingleAccountSemestersController = (0, clearableAsync_1.clearableAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, academicSemester_service_1.getSingleSemesterService)(id);
    (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuccessFully Getting Semester ',
        data: result,
    });
}));
exports.updateSingleAccountSemestersController = (0, clearableAsync_1.clearableAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const result = yield (0, academicSemester_service_1.updateSingleSemesterService)(id, updateData);
    (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuccessFully Getting Semester ',
        data: result,
    });
}));
exports.deleteAcademicSemester = (0, clearableAsync_1.clearableAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, academicSemester_service_1.deleteSingleSemesterService)(id);
    (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuccessFully Deleted Semester ',
        data: result,
    });
}));
