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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFacultyId = exports.findLastFacultyId = exports.createStudentId = exports.findLastStudentId = void 0;
const user_model_1 = require("./user.model");
// for student creating id
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_model_1.UserModel.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id) ? lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(4) : undefined;
});
exports.findLastStudentId = findLastStudentId;
const createStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (yield (0, exports.findLastStudentId)()) || (0).toString().padStart(5, '0');
    // increment id by 1
    let incrementUserId = (parseInt(userId) + 1).toString().padStart(5, '0');
    incrementUserId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incrementUserId}`;
    return incrementUserId;
});
exports.createStudentId = createStudentId;
// for faculty creating id
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_model_1.UserModel.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id) ? lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(2) : undefined;
});
exports.findLastFacultyId = findLastFacultyId;
const createFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const facultyId = (yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, '0');
    let incrementId = (parseInt(facultyId) + 1).toString().padStart(5, '0');
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.createFacultyId = createFacultyId;
// for Admin creating id
// export const createAdminId = async () =>{
//   const currentId = (await findLastAdminId)
// }
