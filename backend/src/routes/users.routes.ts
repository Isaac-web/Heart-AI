import { Router } from 'express';
import { login, registerUser } from '../controllers/users.controllers';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/me', async (req, res) => {});
router.patch('/me', async (req, res) => {});
router.delete('/me', async (req, res) => {});

export default router;
