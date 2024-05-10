import { Schema, model } from 'mongoose';
import Joi from 'joi';

const MedicalReportSchema: Schema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    sex: {
      type: Number,
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
    restecg: {
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
    cp: {
      type: Number,
      min: 0,
      required: true,
    },
    thal: {
      type: Number,
      min: 0,
      required: true,
    },
    cadioStatus: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
    },
  },
  { timestamps: true }
);

export const validateCreateMedicalReport = (data: unknown) => {
  const schema = Joi.object({
    patient: Joi.string().required(),
    doctor: Joi.string().required(),
    age: Joi.number().min(0).required(),
    sex: Joi.number().required(),
    trestbps: Joi.number().min(0).required(),
    chol: Joi.number().min(0).required(),
    fbs: Joi.number().min(0).required(),
    restecg: Joi.number().min(0).required(),
    thalach: Joi.number().min(0).required(),
    exang: Joi.number().min(0).required(),
    oldpeak: Joi.number().min(0).required(),
    slope: Joi.number().min(0).required(),
    ca: Joi.number().min(0).required(),
    cp: Joi.number().min(0).required(),
    thal: Joi.number().min(0).required(),
  });

  return schema.validate(data);
};

export const validateUpdateMedicalReport = (data: unknown) => {
  const schema = Joi.object({
    patient: Joi.string(),
    doctor: Joi.string(),
    age: Joi.number().min(0),
    sex: Joi.number(),
    trestbps: Joi.number().min(0),
    chol: Joi.number().min(0),
    fbs: Joi.number().min(0),
    restecg: Joi.number().min(0),
    thalach: Joi.number().min(0),
    exang: Joi.number().min(0),
    oldpeak: Joi.number().min(0),
    slope: Joi.number().min(0),
    ca: Joi.number().min(0),
    cp: Joi.number().min(0),
    thal: Joi.number().min(0),
  });

  return schema.validate(data);
};

export default model('MedicalReport', MedicalReportSchema);
