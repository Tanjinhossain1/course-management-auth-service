import express from 'express';
import usersRouter from '../modules/users/user.routes';
import academicSemesterRouter from '../modules/academicSemester/academicSemester.route';

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
];

AllRoutes.forEach(route => Routes.use(route.path, route.route));

export default Routes;