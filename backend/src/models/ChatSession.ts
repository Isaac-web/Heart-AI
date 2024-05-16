import { Schema, model, Document, Types } from 'mongoose';
import Joi from 'joi';

export interface IChatSession extends Document {
  title: string;
  patientId: Types.ObjectId;
  medicalReport: Types.ObjectId;
}

const ChatSessionSchema: Schema = new Schema<IChatSession>(
  {
    title: { type: Schema.Types.String, required: true },
    patientId: { type: Schema.Types.ObjectId, required: true },
    medicalReport: {
      type: Schema.Types.ObjectId,
      ref: 'MedicalReport',
      required: false,
    },
  },
  { timestamps: true }
);

const ChatSession = model<IChatSession>('ChatSession', ChatSessionSchema);

export const validateCreateChatSession = (data: unknown) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    medicalReport: Joi.string(),
  });

  return schema.validate(data);
};

export default ChatSession;
