'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteAcademicFaculty =
  exports.updateSingleAccountFacultyController =
  exports.getSingleAccountFacultyController =
  exports.getAllAccountFacultyController =
  exports.createAcademicFacultyController =
    void 0;
const academicFaculty_service_1 = require('./academicFaculty.service');
const clearableAsync_1 = require('../../../shareble/clearableAsync');
const sendResponce_1 = require('../../../shareble/sendResponce');
const http_status_1 = __importDefault(require('http-status'));
const pick_1 = require('../../../shareble/pick');
const pagination_1 = require('../../../constants/pagination');
const academicFaculty_constant_1 = require('./academicFaculty.constant');
exports.createAcademicFacultyController = (0, clearableAsync_1.clearableAsync)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const academicFacultyData = req.body;
      const result = yield (0, academicFaculty_service_1.createAcademicFaculty)(
        academicFacultyData
      );
      (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Faculty Create SuccessFully',
        data: result,
      });
    })
);
exports.getAllAccountFacultyController = (0, clearableAsync_1.clearableAsync)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const filters = (0, pick_1.pick)(
        req.query,
        academicFaculty_constant_1.academicFacultyFilterableFields
      );
      const paginationOption = (0, pick_1.pick)(
        req.query,
        pagination_1.paginationField
      );
      const result = yield (0, academicFaculty_service_1.getAllFacultyServices)(
        filters,
        paginationOption
      );
      (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuccessFully Getting Faculty ',
        paginated:
          result === null || result === void 0 ? void 0 : result.paginated,
        data: result === null || result === void 0 ? void 0 : result.data,
      });
    })
);
exports.getSingleAccountFacultyController = (0,
clearableAsync_1.clearableAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, academicFaculty_service_1.getSingleFacultyService)(
      id
    );
    (0, sendResponce_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'SuccessFully Getting Faculty ',
      data: result,
    });
  })
);
exports.updateSingleAccountFacultyController = (0,
clearableAsync_1.clearableAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const result = yield (0,
    academicFaculty_service_1.updateSingleFacultyService)(id, updateData);
    (0, sendResponce_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'SuccessFully Updating Faculty ',
      data: result,
    });
  })
);
exports.deleteAcademicFaculty = (0, clearableAsync_1.clearableAsync)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      const result = yield (0,
      academicFaculty_service_1.deleteSingleFacultyService)(id);
      (0, sendResponce_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SuccessFully Deleted Faculty ',
        data: result,
      });
    })
);
