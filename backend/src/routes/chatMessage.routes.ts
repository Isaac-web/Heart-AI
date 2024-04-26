import { Router } from 'express';
import { sendMessage } from '../controllers/chatMessages.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, sendMessage);

export default router;
