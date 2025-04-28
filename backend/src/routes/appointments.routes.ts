import { Router } from 'express';
import { createAppointment, getAppointments } from '../controllers/appointments.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, createAppointment);
router.get('/', authenticateToken, getAppointments);

export default router;
