import { Router } from "express";
import * as ChatSessionControllers from "../controllers/chat-sessions.controllers";
import { auth } from "../middleware/auth";

const router = Router();

router.use(auth);

router.post("/me", ChatSessionControllers.createChatSession);
router.get("/me", ChatSessionControllers.getMyChatSessions);
router.delete("/me/:id", ChatSessionControllers.deleteChatSession);
router.patch("/me/:id", ChatSessionControllers.renameChatSession);

export default router;
