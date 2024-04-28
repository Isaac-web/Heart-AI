import { Schema, model, Document } from 'mongoose';
import { Types } from 'mongoose';

export interface IMedicalReport extends Document {
  id: Types.ObjectId;
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  createdAt: Date;
}

const MedicalReportSchema: Schema = new Schema<IMedicalReport>({
  id: { type: Schema.Types.ObjectId, auto: true },
  doctorId: { type: Schema.Types.ObjectId, required: true },
  patientId: { type: Schema.Types.ObjectId, required: true },
  createdAt: [{ type: Date, required: true }],
});

export default model<IMedicalReport>('MedicalReport', MedicalReportSchema);
