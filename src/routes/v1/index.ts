import { Router } from 'express';

const router: Router = Router();

import bookingHourRoutes from './booking-hour.routes.js';
import courtRoutes from './court.routes.js';

router.use('/courts', courtRoutes);
router.use('/booking-hours', bookingHourRoutes);
export default router;
