'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const user_routes_1 = __importDefault(require('../modules/users/user.routes'));
const academicSemester_route_1 = __importDefault(
  require('../modules/academicSemester/academicSemester.route')
);
const academicFaculty_route_1 = __importDefault(
  require('../modules/academicFaculty/academicFaculty.route')
);
const academicDepartment_route_1 = __importDefault(
  require('../modules/academicDepartment/academicDepartment.route')
);
const student_route_1 = __importDefault(
  require('../modules/student/student.route')
);
const Routes = express_1.default.Router();
const AllRoutes = [
  {
    path: '/users',
    route: user_routes_1.default,
  },
  {
    path: '/academic-semester',
    route: academicSemester_route_1.default,
  },
  {
    path: '/academic-faculty',
    route: academicFaculty_route_1.default,
  },
  {
    path: '/academic-department',
    route: academicDepartment_route_1.default,
  },
  {
    path: '/students',
    route: student_route_1.default,
  },
];
AllRoutes.forEach(route => Routes.use(route.path, route.route));
exports.default = Routes;
