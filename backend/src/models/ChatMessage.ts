import mongoose from 'mongoose';
import Joi from 'joi';

export const ChatMessage = mongoose.model(
  'ChatMessage',
  new mongoose.Schema(
    {
      text: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
      },
      chatSession: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    { timestamps: true }
  )
);

export const validateCreateChatMessage = (chatMessage: unknown) => {
  const schema = Joi.object({
    text: Joi.string().min(1).required(),
    context: Joi.string().min(1).required(),
    chatSessionId: Joi.string().required(),
  });

  return schema.validate(chatMessage);
};
