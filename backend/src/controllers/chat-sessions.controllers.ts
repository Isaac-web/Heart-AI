import { Request, Response } from "express";
import ChatSession from "../models/ChatSession";
import { AppRequest, AppResponse } from "../types";

export const getMyChatSessions = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
      successful: false,
      message: "user not found",
    });

  let { page, pageSize } = req.query;
  if (!page || !pageSize || !Number(page) || !Number(pageSize)) {
    return res
      .status(400)
      .json({ successful: false, error: "invalid query parameters" });
  }

  try {
    let skip_ = (Number(page) - 1) * Number(pageSize);
    let limit_: number = Number(pageSize);

    const chatSessions = await ChatSession.find({ patientId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip_)
      .limit(limit_);

    if (!chatSessions) {
      return res
        .status(400)
        .json({ successful: false, error: "Error getting forms" });
    }

    res.status(200).json({ successful: true, data: chatSessions });
  } catch (error) {}
};

export const createChatSession = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
      successful: false,
      message: "user not found",
    });

  const createdChatSession = await ChatSession.create({
    patientId: req.body.patientId,
    title: req.body.title,
  });

  return res.json({
    successful: true,
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
    return res
      .status(400)
      .json({ successful: false, error: "Error deleting form" });
  }

  try {
    const deletedChatSession = await ChatSession.findByIdAndDelete(
      req.params.id
    );
    return res.status(200).json({ successful: true, data: deletedChatSession });
  } catch (error) {
    return res
      .status(400)
      .json({ successful: false, error: "Error deleting chat session" });
  }
};

export const renameChatSession = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
      successful: false,
      message: "user not found",
    });

  if (!req.params.id) {
    return res
      .status(400)
      .json({ successful: false, error: "Error renaming chat session" });
  }

  try {
    const renamedChatSession = await ChatSession.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    return res.status(200).json({ successful: true, data: renamedChatSession });
  } catch (error) {
    return res
      .status(400)
      .json({ successful: false, error: "Error renaming chat session" });
  }
};