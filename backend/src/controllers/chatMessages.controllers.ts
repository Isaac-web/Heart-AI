import { AppRequest, AppResponse } from '../types';
import { ChatMessage, validateCreateChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';

export const sendMessage = async (req: AppRequest, res: AppResponse) => {
  const { error } = validateCreateChatMessage(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  if (!req.user)
    return res.status(401).json({ message: 'User is not authenticated.' });

  const [user] = await Promise.all([User.findById(req.user._id)]);
  if (!user)
    return res.status(404).json({
      message: 'Could not find user with the given id',
    });

  //check if chat session exists

  const chatMessage = await ChatMessage.create({
    user: req.user._id,
    chatSession: req.body.chatSessionId,
    text: req.body.text,
  });

  res.json({
    data: chatMessage,
  });
};
