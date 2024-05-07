import { Request, Response } from "express";
import ChatSession from "../models/ChatSession";
import { AppRequest, AppResponse } from "../types";
import { ChatMessage } from "../models/ChatMessage";

export const getMyChatSessions = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
      message: "user not found",
    });

  try {
    const chatSessions = await ChatSession.find({
      patientId: req.user._id,
    }).sort({ createdAt: -1 });

    if (!chatSessions) {
      return res.status(400).json({ message: "Error getting forms" });
    }

    res.status(200).json({ data: chatSessions });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong." });
  }
};

export const createChatSession = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
      message: "user not found",
    });

  const existingChat = await ChatSession.findOne({
    patientId: req.user._id,
    title: req.body.title,
  });

  if (existingChat)
    return res.status(400).json({
      message:
        "A session already exists with the given title. Trying using another title.",
    });

  const createdChatSession = await ChatSession.create({
    patientId: req.body.patientId,
    title: req.body.title,
  });

  return res.json({
    data: createdChatSession,
  });
};

export const deleteChatSession = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
      successful: false,
      message: "user not found",
    });

  if (!req.params.id) {
    return res.status(400).json({ message: "Error deleting form" });
  }

  try {
    const [deletedChatSession] = await Promise.all([
      ChatSession.findByIdAndDelete(req.params.id),
      ChatMessage.deleteMany({ chatSession: req.params.id }),
    ]);

    return res.status(200).json({ successful: true, data: deletedChatSession });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting chat session" });
  }
};

export const renameChatSession = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
      message: "user not found",
    });

  if (!req.params.id) {
    return res.status(400).json({ message: "Error renaming chat session" });
  }

  try {
    const renamedChatSession = await ChatSession.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    return res.status(200).json({ data: renamedChatSession });
  } catch (error) {
    return res.status(400).json({ message: "Error renaming chat session" });
  }
};
