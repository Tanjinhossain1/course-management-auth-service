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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentController = void 0;
const user_service_1 = require("./user.service");
const clearableAsync_1 = require("../../../shareble/clearableAsync");
const http_status_1 = __importDefault(require("http-status"));
const sendResponce_1 = require("../../../shareble/sendResponce");
exports.createStudentController = (0, clearableAsync_1.clearableAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { student } = _a, userData = __rest(_a, ["student"]);
    const result = yield (0, user_service_1.createStudentService)(student, userData);
    (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Create SuccessFully',
        data: result,
    });
}));