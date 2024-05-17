import { Router } from 'express';
import { getDoctorSummary } from '../controllers/analytics.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/doctor-summary', auth, getDoctorSummary);

export default router;
