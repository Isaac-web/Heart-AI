<<<<<<< HEAD
import { Request, Response } from "express";
import ChatSession from "../models/ChatSession";
import { AppRequest, AppResponse } from "../types";
=======
import ChatSession from '../models/ChatSession';
import { AppRequest, AppResponse } from '../types';
>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2

export const getMyChatSessions = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
<<<<<<< HEAD
      successful: false,
      message: "user not found",
    });

  let { page, pageSize } = req.query;
  if (!page || !pageSize || !Number(page) || !Number(pageSize)) {
    return res
      .status(400)
      .json({ successful: false, error: "invalid query parameters" });
  }

=======
      message: 'user not found',
    });

>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2
  try {
    const chatSessions = await ChatSession.find({
      patientId: req.user._id,
    }).sort({ createdAt: -1 });

    if (!chatSessions) {
<<<<<<< HEAD
      return res
        .status(400)
        .json({ successful: false, error: "Error getting forms" });
=======
      return res.status(400).json({ message: 'Error getting forms' });
>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2
    }

    res.status(200).json({ data: chatSessions });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

export const createChatSession = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
<<<<<<< HEAD
      successful: false,
      message: "user not found",
=======
      message: 'user not found',
>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2
    });

  const existingChat = await ChatSession.findOne({
    patientId: req.user._id,
    title: req.body.title,
  });

  if (existingChat)
    return res.status(400).json({
      message:
        'A session already exists with the given title. Trying using another title.',
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
<<<<<<< HEAD
    return res
      .status(400)
      .json({ successful: false, error: "Error deleting form" });
=======
    return res.status(400).json({ message: 'Error deleting form' });
>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2
  }

  try {
    const deletedChatSession = await ChatSession.findByIdAndDelete(
      req.params.id
    );
    return res.status(200).json({ successful: true, data: deletedChatSession });
  } catch (error) {
<<<<<<< HEAD
    return res
      .status(400)
      .json({ successful: false, error: "Error deleting chat session" });
=======
    return res.status(400).json({ message: 'Error deleting chat session' });
>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2
  }
};

export const renameChatSession = async (req: AppRequest, res: AppResponse) => {
  if (!req.user)
    return res.status(404).json({
<<<<<<< HEAD
      successful: false,
      message: "user not found",
    });

  if (!req.params.id) {
    return res
      .status(400)
      .json({ successful: false, error: "Error renaming chat session" });
=======
      message: 'user not found',
    });

  if (!req.params.id) {
    return res.status(400).json({ message: 'Error renaming chat session' });
>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2
  }

  try {
    const renamedChatSession = await ChatSession.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    return res.status(200).json({ data: renamedChatSession });
  } catch (error) {
<<<<<<< HEAD
    return res
      .status(400)
      .json({ successful: false, error: "Error renaming chat session" });
=======
    return res.status(400).json({ message: 'Error renaming chat session' });
>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2
  }
};
