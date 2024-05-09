import { Router } from 'express';
import {
  doctorLogin,
  getCurrentDoctor,
  registerDoctor,
  updateDoctor,
  getDoctorById,
  getDoctorInfo,
  deleteDoctor,
} from '../controllers/doctors.controllers';


import { doctorAuth } from '../middleware/doctorAuth';

const router = Router();

router.post('/register', registerDoctor);

router.post('/login', doctorLogin);


router.get('/me', doctorAuth, getCurrentDoctor);

router.get('/:id', getDoctorById);

router.get('/', getDoctorInfo);


// router.patch('/:id', (req, res) => {
//   res.json({ message: 'Get Doctor By Id' });
// });
router.patch('/:id', doctorAuth, updateDoctor);

// router.patch('/:id', auth, updateDoctor);

router.delete('/me', doctorAuth, deleteDoctor);

export default router;
