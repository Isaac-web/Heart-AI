import { Router } from 'express';
import {
  getUserInfo,
  login,
  registerUser,
} from '../controllers/users.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/me', auth, getUserInfo);
router.patch('/me', async (req, res) => {});
router.delete('/me', async (req, res) => {});

export default router;
