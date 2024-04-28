import { Schema, model } from 'mongoose';

const MedicalReportSchema: Schema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, required: true },
  patientId: { type: Schema.Types.ObjectId, required: true },
  age: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  sex: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: true,
  },
  trestbps: {
    type: Number,
    min: 0,
    required: true,
  },
  chol: {
    type: Number,
    min: 0,
    required: true,
  },
  fbs: {
    type: Number,
    min: 0,
    required: true,
  },
  thalach: {
    type: Number,
    min: 0,
    required: true,
  },
  exang: {
    type: Number,
    min: 0,
    required: true,
  },
  oldpeak: {
    type: Number,
    min: 0,
    required: true,
  },
  slope: {
    type: Number,
    min: 0,
    required: true,
  },
  ca: {
    type: Number,
    min: 0,
    required: true,
  },
  cp_1: {
    type: Number,
    min: 0,
    required: true,
  },
  cp_2: {
    type: Number,
    min: 0,
    required: true,
  },
  cp_3: {
    type: Number,
    min: 0,
    required: true,
  },
  restecg_1: {
    type: Number,
    min: 0,
    required: true,
  },
  restecg_2: {
    type: Number,
    min: 0,
    required: true,
  },
  thal_1: {
    type: Number,
    min: 0,
    required: true,
  },
  thal_2: {
    type: Number,
    min: 0,
    required: true,
  },
  thal_3: {
    type: Number,
    min: 0,
    required: true,
  },
});

export default model('MedicalReport', MedicalReportSchema);
