import { Router } from 'express';
import {
  createMedicalReportRequest,
  deleteMedicalReportRequest,
  fetchMedicalReportRequest,
} from '../controllers/medicalReportRequest.controllers';

const router = Router();

router.post('/', createMedicalReportRequest);
router.get('/me', async (req, res) => {});
router.get('/', fetchMedicalReportRequest);
router.delete('/:id', deleteMedicalReportRequest);

export default router;
