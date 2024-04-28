import { Schema, model } from 'mongoose';
import Joi from 'joi';

const MedicalReportSchema: Schema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  sex: {
    type: String,
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

export const validateCreateMedicalReport = (data: unknown) => {
  const schema = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    age: Joi.number().min(0).required(),
    sex: Joi.string().required(),
    trestbps: Joi.number().min(0).required(),
    chol: Joi.number().min(0).required(),
    fbs: Joi.number().min(0).required(),
    thalach: Joi.number().min(0).required(),
    exang: Joi.number().min(0).required(),
    oldpeak: Joi.number().min(0).required(),
    slope: Joi.number().min(0).required(),
    ca: Joi.number().min(0).required(),
    cp_1: Joi.number().min(0).required(),
    cp_2: Joi.number().min(0).required(),
    cp_3: Joi.number().min(0).required(),
    restecg_1: Joi.number().min(0).required(),
    restecg_2: Joi.number().min(0).required(),
    thal_1: Joi.number().min(0).required(),
    thal_2: Joi.number().min(0).required(),
    thal_3: Joi.number().min(0).required(),
  });

  return schema.validate(data);
};

export default model('MedicalReport', MedicalReportSchema);
