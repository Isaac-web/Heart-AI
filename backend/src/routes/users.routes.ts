import { Router } from 'express';
import {
  fetchUsers,
  getUserInfo,
  login,
  registerUser,
  updateUser,
} from '../controllers/users.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/', auth, fetchUsers);
router.get('/me', auth, getUserInfo);
router.patch('/me', auth, updateUser);
router.delete('/me', async (req, res) => {});

export default router;
