import { Router } from 'express';
import {
  doctorLogin,
  getCurrentDoctor,
  registerDoctor,
  updateDoctor,
  getDoctorById,
  getAllDoctor,
  deleteDoctor,
} from '../controllers/doctors.controllers';

import { doctorAuth } from '../middleware/doctorAuth';

const router = Router();

router.post('/register', registerDoctor);
router.post('/login', doctorLogin);

router.get('/me', doctorAuth, getCurrentDoctor);
router.get('/:id', getDoctorById);
router.get('/', getAllDoctor);

router.patch('/:id', doctorAuth, updateDoctor);
router.delete('/me', doctorAuth, deleteDoctor);

export default router;
