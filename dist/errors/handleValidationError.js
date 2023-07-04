'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validationCastError =
  exports.validationZodError =
  exports.handleValidationError =
    void 0;
/* ****************************************************************** */
/* *************   mongoose validation error handler   ************** */
/* ****************************************************************** */
const handleValidationError = error => {
  const errors = Object.values(error.errors).map(errorEl => {
    return {
      path: errorEl === null || errorEl === void 0 ? void 0 : errorEl.path,
      message:
        errorEl === null || errorEl === void 0 ? void 0 : errorEl.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode: statusCode,
    errorMessages: errors,
    message: 'Validation Error',
  };
};
exports.handleValidationError = handleValidationError;
/* ****************************************************************** */
/* ****************  Zod validation error handler  ****************** */
/* ****************************************************************** */
const validationZodError = error => {
  const errors = error.issues.map(issue => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode: statusCode,
    errorMessages: errors,
    message: 'Validation Error',
  };
};
exports.validationZodError = validationZodError;
/* ****************************************************************** */
/* ****************  handle Cast error   ****************** */
/* ****************************************************************** */
const validationCastError = error => {
  const errors = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];
  const statusCode = 400;
  return {
    statusCode: statusCode,
    errorMessages: errors,
    message: 'Cast Error',
  };
};
exports.validationCastError = validationCastError;
