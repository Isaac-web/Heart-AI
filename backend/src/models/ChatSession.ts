import { Schema, model, Document, Types } from "mongoose";

export interface IChatSession extends Document {
  id: Types.ObjectId;
  patientId: Types.ObjectId;
  title: string;
  startedAt: Date;
}

const ChatSessionSchema: Schema = new Schema<IChatSession>({
  id: { type: Schema.Types.ObjectId, required: true, unique: true },
  title: { type: Schema.Types.String, required: true },
  patientId: { type: Schema.Types.ObjectId, required: true },
  startedAt: { type: Schema.Types.Date, required: true },
});

const ChatSession = model<IChatSession>("ChatSession", ChatSessionSchema);

export default ChatSession;
