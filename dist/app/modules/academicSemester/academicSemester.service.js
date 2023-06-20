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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteSingleSemesterService =
  exports.updateSingleSemesterService =
  exports.getSingleSemesterService =
  exports.getAllSemesterServices =
  exports.createAcademicSemester =
    void 0;
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helper/paginationHelper');
const academicSemester_constant_1 = require('./academicSemester.constant');
const academicSemester_model_1 = require('./academicSemester.model');
const http_status_1 = __importDefault(require('http-status'));
const createAcademicSemester = academic_semester =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      academicSemester_constant_1.titleCodeMapper[academic_semester.title] !==
      academic_semester.code
    ) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        `Academic Semester Code Is ${
          academicSemester_constant_1.titleCodeMapper[academic_semester.title]
        } But You Give ${academic_semester.code} That Is Wrong`
      );
    }
    const result = yield academicSemester_model_1.academicSemester.create(
      academic_semester
    );
    return result;
  });
exports.createAcademicSemester = createAcademicSemester;
const getAllSemesterServices = (filters, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const { skip, limit, page, sortBy, sortOrder } = (0,
    paginationHelper_1.calculatePagination)(pagination);
    const sortConditions = {};
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: academicSemester_constant_1.searchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    const filteringCondition =
      andConditions.length > 0 ? { $and: andConditions } : {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const result = yield academicSemester_model_1.academicSemester
      .find(filteringCondition)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total =
      yield academicSemester_model_1.academicSemester.countDocuments();
    return {
      paginated: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
exports.getAllSemesterServices = getAllSemesterServices;
const getSingleSemesterService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.academicSemester.findById(id);
    return result;
  });
exports.getSingleSemesterService = getSingleSemesterService;
const updateSingleSemesterService = (id, updateData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      updateData.title &&
      updateData.code &&
      academicSemester_constant_1.titleCodeMapper[updateData.title] !==
        updateData.code
    ) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        `Academic Semester Code Is ${
          academicSemester_constant_1.titleCodeMapper[updateData.title]
        } But You Give ${updateData.code} That Is Wrong`
      );
    }
    const result =
      yield academicSemester_model_1.academicSemester.findOneAndUpdate(
        { _id: id },
        updateData,
        {
          new: true,
        }
      );
    return result;
  });
exports.updateSingleSemesterService = updateSingleSemesterService;
const deleteSingleSemesterService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicSemester_model_1.academicSemester.findByIdAndDelete({
        _id: id,
      });
    return result;
  });
exports.deleteSingleSemesterService = deleteSingleSemesterService;
