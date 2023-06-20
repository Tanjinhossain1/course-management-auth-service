import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import { ValidationRequest } from '../../midlewares/validateRequest';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculties);

router.patch(
  '/:id',
  ValidationRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRouter = router;
