import express from 'express';
import {
  deleteSingleStudent,
  getAllStudentController,
  getSingleAccountStudentsController,
  updateSingleAccountStudentsController,
} from './student.controller';
import { ValidationRequest } from '../../midlewares/validateRequest';
import { updateStudentZodSchema } from './student.validation';

const studentRouter = express.Router();

studentRouter.get('/:id', getSingleAccountStudentsController);

studentRouter.patch(
  '/:id',
  ValidationRequest(updateStudentZodSchema),
  updateSingleAccountStudentsController
);

studentRouter.get('/', getAllStudentController);

studentRouter.delete('/:id', deleteSingleStudent);

export default studentRouter;
