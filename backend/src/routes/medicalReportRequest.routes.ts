import { Router } from 'express';
import {
  createMedicalReportRequest,
  deleteMedicalReportRequest,
  fetchMedicalReportRequest,
  fetchUserMedicalReportRequest,
} from '../controllers/medicalReportRequest.controllers';
import { auth } from '../middleware/auth';
import { doctorAuth } from '../middleware/doctorAuth';

const router = Router();

router.post('/', auth, createMedicalReportRequest);
router.get('/me', auth, fetchUserMedicalReportRequest);
router.get('/', doctorAuth, fetchMedicalReportRequest);
router.delete('/:id', auth, deleteMedicalReportRequest);

export default router;
