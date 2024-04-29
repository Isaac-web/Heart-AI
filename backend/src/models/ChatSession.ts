import { Schema, model, Document, Types } from 'mongoose';

export interface IChatSession extends Document {
  title: string;
  patientId: Types.ObjectId;
}

const ChatSessionSchema: Schema = new Schema<IChatSession>(
  {
    title: { type: Schema.Types.String, required: true },
    patientId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const ChatSession = model<IChatSession>('ChatSession', ChatSessionSchema);

export default ChatSession;
