import { Router } from 'express';
import {
  createMedicalReportRequest,
  deleteMedicalReportRequest,
  fetchMedicalReportRequest,
  fetchUserMedicalReport,
} from '../controllers/medicalReportRequest.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, createMedicalReportRequest);
router.get('/me', auth, fetchUserMedicalReport);
router.get('/', auth, fetchMedicalReportRequest);
router.delete('/:id', deleteMedicalReportRequest);

export default router;
