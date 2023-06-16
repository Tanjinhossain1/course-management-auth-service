"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require("../../config"));
const handleValidationError_1 = require("../../errors/handleValidationError");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something Went Wrong !';
    let errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidatorError') {
        /* ************ mongoose validation Error handler *********** */
        const getValidateError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = getValidateError.statusCode;
        message = getValidateError.message;
        errorMessages = getValidateError.errorMessages;
    }
    else if (err instanceof ApiError_1.default) {
        /* ************ mongoose validation Error handler *********** */
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err.message,
                },
            ]
            : [];
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        /* ************ Cast Error handler *********** */
        const getValidationCastError = (0, handleValidationError_1.validationCastError)(err);
        statusCode = getValidationCastError.statusCode;
        message = getValidationCastError.message;
        errorMessages = getValidationCastError.errorMessages;
    }
    else if (err instanceof zod_1.ZodError) {
        /* ************ Zod validation Error handler *********** */
        const getValidateZodError = (0, handleValidationError_1.validationZodError)(err);
        statusCode = getValidateZodError.statusCode;
        message = getValidateZodError.message;
        errorMessages = getValidateZodError.errorMessages;
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err.message,
                },
            ]
            : [];
    }
    /* ************ send the status of final structure of error *********** */
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
    next();
};
exports.globalErrorHandler = globalErrorHandler;
