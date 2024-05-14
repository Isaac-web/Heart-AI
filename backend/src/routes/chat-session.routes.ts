import { Router } from 'express';
import * as ChatSessionControllers from '../controllers/chat-sessions.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/me', auth, ChatSessionControllers.createChatSession);
router.get('/me', auth, ChatSessionControllers.getMyChatSessions);
router.delete('/me/:id', auth, ChatSessionControllers.deleteChatSession);
router.patch('/me/:id', auth, ChatSessionControllers.renameChatSession);

export default router;
