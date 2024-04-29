import mongoose from 'mongoose';
import Joi from 'joi';

export const HealthReport = mongoose.model(
  'HealthReport',
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    age: { type: Number, required: true, min: 0 },
    sex: { type: Number, required: true, enum: [0, 1] },
    trestbps: { type: Number, required: true, min: 0 },
    chol: { type: Number, required: true, min: 0 },
    fbs: { type: Number, required: true, enum: [0, 1] },
    thalach: { type: Number, required: true, min: 0 },
    exang: { type: Number, required: true, enum: [0, 1] },
    oldpeak: { type: Number, required: true },
    slope: { type: Number, required: true, enum: [0, 1, 2] },
    ca: { type: Number, required: true, min: 0 },
    cp_1: { type: Number, required: true, enum: [0, 1] },
    cp_2: { type: Number, required: true, enum: [0, 1] },
    cp_3: { type: Number, required: true, enum: [0, 1] },
    restecg_1: { type: Number, required: true, enum: [0, 1] },
    restecg_2: { type: Number, required: true, enum: [0, 1] },
    thal_1: { type: Number, required: true, enum: [0, 1] },
    thal_2: { type: Number, required: true, enum: [0, 1] },
    thal_3: { type: Number, required: true, enum: [0, 1] },
  })
);

export const validatePredictionParams = (params: unknown) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
    sex: Joi.number().valid(0, 1).required(),
    trestbps: Joi.number().integer().min(0).required(),
    chol: Joi.number().integer().min(0).required(),
    fbs: Joi.number().valid(0, 1).required(),
    thalach: Joi.number().integer().min(0).required(),
    exang: Joi.number().valid(0, 1).required(),
    oldpeak: Joi.number().required(),
    slope: Joi.number().valid(0, 1, 2).required(),
    ca: Joi.number().integer().min(0).required(),
    cp_1: Joi.number().valid(0, 1).required(),
    cp_2: Joi.number().valid(0, 1).required(),
    cp_3: Joi.number().valid(0, 1).required(),
    restecg_1: Joi.number().valid(0, 1).required(),
    restecg_2: Joi.number().valid(0, 1).required(),
    thal_1: Joi.number().valid(0, 1).required(),
    thal_2: Joi.number().valid(0, 1).required(),
    thal_3: Joi.number().valid(0, 1).required(),
  });

  return schema.validate(params);
};
