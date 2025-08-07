import express, { type Router } from 'express';
import {
  createCourtController,
  deleteCourtController,
  getAllCourtsController,
  getCourtByIdController,
  updateCourtController,
} from '@/controllers/court.controller.js';
import { validationMiddleware } from '@/middleware/validation.middleware';
import {
  createCourtValidators,
  updateCourtValidators,
} from '@/validators/court.validator.js';
import { idParamValidator } from '@/validators/general.validators.js';

const router: Router = express.Router();

router.post(
  '/',
  createCourtValidators,
  validationMiddleware,
  createCourtController,
);
router.get('/', getAllCourtsController);
router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getCourtByIdController,
);
router.patch(
  '/:id',
  idParamValidator,
  updateCourtValidators,
  validationMiddleware,
  updateCourtController,
);
router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteCourtController,
);

export default router;
