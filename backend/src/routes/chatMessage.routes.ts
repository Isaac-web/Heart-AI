import { Router } from 'express';
import {
  fetchChatSessionMessages,
  sendMessage,
} from '../controllers/chatMessages.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, sendMessage);
router.get('/', auth, fetchChatSessionMessages);

export default router;
