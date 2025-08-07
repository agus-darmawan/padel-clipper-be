import express, { type Router } from 'express';
import {
  createBookingHourController,
  deleteBookingHourController,
  getAllBookingHoursController,
  getBookingHourByIdController,
  updateBookingHourController,
} from '@/controllers/booking-hour.controller.js';
import { validationMiddleware } from '@/middleware/validation.middleware.js';
import {
  createBookingHourValidators,
  updateBookingHourValidators,
} from '@/validators/booking-hour.validator.js';
import { idParamValidator } from '@/validators/general.validators.js';

const router: Router = express.Router();

router.post(
  '/',
  createBookingHourValidators,
  validationMiddleware,
  createBookingHourController,
);
router.get('/', getAllBookingHoursController);
router.get(
  '/:id',
  idParamValidator,
  validationMiddleware,
  getBookingHourByIdController,
);
router.patch(
  '/:id',
  idParamValidator,
  updateBookingHourValidators,
  validationMiddleware,
  updateBookingHourController,
);
router.delete(
  '/:id',
  idParamValidator,
  validationMiddleware,
  deleteBookingHourController,
);

export default router;
