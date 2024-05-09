import { Router } from 'express';
import {
  doctorLogin,
  registerDoctor,
  updateDoctor,
  getDoctorById,
  getDoctorInfo,
  getMyProfileAsDoctor,
  deleteDoctor,
} from '../controllers/doctors.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', registerDoctor);

router.post('/login', doctorLogin);

router.get('/me', auth, getMyProfileAsDoctor);

router.get('/:id', getDoctorById);

router.get('/', getDoctorInfo);

// router.patch('/:id', (req, res) => {
//   res.json({ message: 'Get Doctor By Id' });
// });

router.patch('/:id', auth, updateDoctor);

router.delete('/me', auth, deleteDoctor);

export default router;
