import { Router } from 'express';
import {
  doctorLogin,
  getCurrentDoctor,
  registerDoctor,
  updateDoctor,
} from '../controllers/doctors.controllers';
import { doctorAuth } from '../middleware/doctorAuth';

const router = Router();

router.post('/register', registerDoctor);
router.post('/login', doctorLogin);
router.get('/me', doctorAuth, getCurrentDoctor);
router.patch('/:id', doctorAuth, updateDoctor);

router.get('/:id', (req, res) => {
  res.json({ message: 'Get Doctor By Id' });
});

router.get('/', (req, res) => {
  res.json({ message: 'Fetch All Doctors' });
});

router.patch('/:id', (req, res) => {
  res.json({ message: 'Doctors endpoint' });
});

router.delete('/me', (req, res) => {
  res.json({ message: 'Doctors endpoint' });
});

export default router;
