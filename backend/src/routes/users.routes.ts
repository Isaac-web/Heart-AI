import { Router } from 'express';
import { registerUser } from '../controllers/users.controllers';

const router = Router();

router.post('/register', registerUser);

router.post('/login', async (req, res) => {});
router.get('/me', async (req, res) => {});
router.patch('/me', async (req, res) => {});
router.delete('/me', async (req, res) => {});

export default router;
