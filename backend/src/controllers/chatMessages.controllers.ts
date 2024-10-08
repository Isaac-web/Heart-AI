import { AppRequest, AppResponse } from '../types';
import { ChatMessage, validateCreateChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';
import axios from 'axios';
import config from 'config';
import { MedicalReport } from '../models/MedicalReport';
import ChatSession from '../models/ChatSession';

export const sendMessage = async (req: AppRequest, res: AppResponse) => {
  const { error } = validateCreateChatMessage(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  if (!req.user)
    return res.status(401).json({ message: 'User is not authenticated.' });

  const [user, chatSession] = await Promise.all([
    User.findById(req.user._id),
    ChatSession.findById(req.body.chatSessionId),
  ]);
  if (!user)
    return res.status(404).json({
      message: 'Could not find user with the given id',
    });

  if (!chatSession)
    return res.status(404).json({
      message: 'Could not find chat session with the given id.',
    });

  const chatMessage = await ChatMessage.create({
    user: req.user._id,
    chatSession: req.body.chatSessionId,
    text: req.body.text,
  });

  const medicalReport = chatSession.medicalReport
    ? await MedicalReport.findById(chatSession.medicalReport)
    : {};

  try {
    const { data: llmChat } = await axios.request({
      method: 'POST',
      url: config.get('LLMUrl'),
      data: {
        text: req.body.text,
        session_id: req.body.chatSessionId,
        context: medicalReport,
      },
    });

    await ChatMessage.create({
      chatSession: req.body.chatSessionId,
      text: llmChat.response,
    });

    user.password = '';

    res.json({
      data: {
        userMessage: { ...chatMessage.toObject(), user },
        systemMessage: llmChat.response,
      },
    });
  } catch (err: any) {
    console.log(err.response.data);
    return res.status(500).json({
      message: 'Something went wrong.',
    });
  }
};

export const fetchChatSessionMessages = async (
  req: AppRequest,
  res: AppResponse
) => {
  const chatMessages = await ChatMessage.find({
    chatSession: req.params.chatSessionId,
  }).populate('user', '-password');

  res.json({
    data: chatMessages,
  });
};

export const deleteChatMessage = async (req: AppRequest, res: AppResponse) => {
  const chatMessage = await ChatMessage.findByIdAndDelete(req.params.id);

  if (!chatMessage)
    return res
      .status(404)
      .json({ message: 'Could not find chat message with the given id.' });

  res.json({
    message: '1 chat message was deleted.',
    data: chatMessage,
  });
};
