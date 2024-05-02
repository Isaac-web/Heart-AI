import { Router } from 'express';
import * as MedicalReportControllers from '../controllers/medical-reports.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, MedicalReportControllers.createMedicalReport);
router.get('/me', auth, MedicalReportControllers.getMyMedicalReport);
router.get('/:id', auth, MedicalReportControllers.getMedicalReport);
router.get('/', auth, MedicalReportControllers.getMedicalReports);
router.patch('/:id', auth, MedicalReportControllers.updateMedicalReport);
router.delete('/:id', auth, MedicalReportControllers.deleteMedicalReport);

export default router;
