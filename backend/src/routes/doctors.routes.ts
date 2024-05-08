import { Router } from 'express';
import {
  doctorLogin,
  registerDoctor,
} from '../controllers/doctors.controllers';

const router = Router();

router.post('/register', registerDoctor);

router.post('/login', doctorLogin);

router.get('/me', (req, res) => {
  res.json({ message: 'Get Current Doctor' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get Doctor By Id' });
});

router.get('/', (req, res) => {
  res.json({ message: 'Fetch All Doctors' });
});

router.patch('/:id', (req, res) => {
  res.json({ message: 'Get Doctor By Id' });
});

router.patch('/:id', (req, res) => {
  res.json({ message: 'Doctors endpoint' });
});

router.delete('/me', (req, res) => {
  res.json({ message: 'Doctors endpoint' });
});

export default router;
