import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import { ValidationRequest } from '../../midlewares/validateRequest';
const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmins);

router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  ValidationRequest(AdminValidation.updateAdmin),
  AdminController.updateAdmin
);

export const AdminRouter = router;
