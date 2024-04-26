import { Router } from "express";
import * as ChatSessionControllers from "../controllers/chat-sessions.controllers";

const router = Router();

router.get("/me", ChatSessionControllers.getMyChatSessions);
router.get("/me/:id", ChatSessionControllers.getMyChatSession);
router.post("/me", ChatSessionControllers.createChatSession);
router.delete("/me/:id", ChatSessionControllers.deleteChatSession);
router.patch("/me/:id", ChatSessionControllers.renameChatSession);

export default router;
