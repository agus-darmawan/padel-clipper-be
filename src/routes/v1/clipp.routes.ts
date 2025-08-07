import express, { type Router } from 'express';
import {
  getClippByCourtAndIdController,
  getClippByIdController,
  getClippsByBookingHourController,
  uploadClippController,
} from '@/controllers/clipp.controller.js';

const router: Router = express.Router();

router.post('/upload', uploadClippController);
router.get('/bookingHour/:bookingHourId', getClippsByBookingHourController);
router.get('/court/:courtId/clipp/:id', getClippByCourtAndIdController);
router.get('/clipp/:id', getClippByIdController);

export default router;
