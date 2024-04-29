import { Router } from 'express';
import * as MedicalReportControllers from '../controllers/medical-reports.controllers';

const router = Router();

router.post('/', MedicalReportControllers.createMedicalReport);
router.get('/me', MedicalReportControllers.getMyMedicalReport);
router.get('/:id', MedicalReportControllers.getMedicalReport);
router.get('/', MedicalReportControllers.getMedicalReports);
router.patch('/:id', MedicalReportControllers.updateMedicalReport);
router.delete('/:id', MedicalReportControllers.deleteMedicalReport);

export default router;
