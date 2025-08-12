import { Router } from 'express';

const router: Router = Router();

import bookingHourRoutes from './booking-hour.routes.js';
import clipRoutes from './clipp.routes.js';
import courtRoutes from './court.routes.js';

router.use('/courts', courtRoutes);
router.use('/clips', clipRoutes);
router.use('/booking-hours', bookingHourRoutes);
export default router;
