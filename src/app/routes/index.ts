import express from 'express';
import usersRouter from '../modules/users/user.routes';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.route';
import academicFacultyRouter from '../modules/academicFaculty/academicFaculty.route';
import academicDepartmentRouter from '../modules/academicDepartment/academicDepartment.route';
import studentRouter from '../modules/student/student.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { AdminRouter } from '../modules/admin/admin.route';

const Routes = express.Router();
const AllRoutes = [
  {
    path: '/users',
    route: usersRouter,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/faculty',
    route: FacultyRouter,
  },
  {
    path: '/admin',
    route: AdminRouter,
  },
];

AllRoutes.forEach(route => Routes.use(route.path, route.route));

export default Routes;
