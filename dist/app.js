"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./app/midlewares/globalErrorHandler");
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application route
app.use('/api/v1/', routes_1.default);
//global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// no route found handle
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Route Not Found',
        errorMessage: [
            {
                path: '.',
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
