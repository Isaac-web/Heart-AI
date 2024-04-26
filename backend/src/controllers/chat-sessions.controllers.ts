import { Request, Response } from "express";
import ChatSession from "../models/ChatSession";

export const getMyChatSessions = async (req: Request, res: Response) => {
  const chatSessions = await ChatSession.find({ patientId: req.user._id })
    .sort({ createdAt: -1 })
    .skip(0)
    .limit(10);

  return res.json({
    successful: true,
    data: [
      {
        id: `${Date.now()}`,
        title: "Chat session title",
        patientId: "patient id",
        startedAt: new Date(),
      },
    ],
  });
};

export const getMyChatSession = async (req: Request, res: Response) => {
  return res.json({
    successful: true,
    data: {
      id: `${Date.now()}`,
      title: "Chat session title",
      patientId: "patient id",
      startedAt: new Date(),
    },
  });
};

export const deleteChatSession = async (req: Request, res: Response) => {
  return res.json({
    successful: true,
    message: "deleted chat session",
  });
};

export const createChatSession = async (req: Request, res: Response) => {
  return res.json({
    successful: true,
    message: "created chat session",
  });
};

export const renameChatSession = async (req: Request, res: Response) => {
  return res.json({
    successful: true,
    message: "renamed chat session",
  });
};
