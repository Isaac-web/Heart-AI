import mongoose from 'mongoose';
import Joi from 'joi';

export const MedicalReport = mongoose.model(
  'MedicalReport',
  new mongoose.Schema(
    {
      status: {
        type: String,
      },
      cadioStatus: {
        type: Number,
        default: 0,
      },
      confidenceLevel: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
      },
      details: {
        age: {
          type: Number,
          min: 16,
          max: 120,
          required: true,
        },
        sex: {
          type: Number,
          min: 0,
          max: 1,
          required: true,
        },
        chestPainType: {
          type: Number,
          min: 0,
          max: 3,
          required: true,
        },
        restingBloodPressure: {
          type: Number,
          min: 94,
          max: 200,
          required: true,
        },
        serumColesterol: {
          type: Number,
          min: 120,
          max: 570,
          required: true,
        },
        fastingBloodSugarLevel: {
          type: Number,
          min: 0,
          max: 1,
          required: true,
        },
        restingElectrocardiographocResults: {
          type: Number,
          min: 0,
          max: 2,
          required: true,
        },
        maximumHeartRate: {
          type: Number,
          min: 60,
          max: 220,
          required: true,
        },
        exerciseInducedAngina: {
          type: Number,
          min: 0,
          max: 1,
          required: true,
        },
        stDepression: {
          type: Number,
          min: 0,
          max: 7,
          required: true,
        },
        slope: {
          type: Number,
          min: 0,
          max: 2,
          required: true,
        },
        numberOfMajorVessels: {
          type: Number,
          min: 0,
          max: 4,
          required: true,
        },
        thalliumStressTestResults: {
          type: Number,
          min: 0,
          max: 3,
          required: true,
        },
      },
      finalVerdict: {
        type: String,
        maxlength: 4096,
        default: '',
      },
    },
    { timestamps: true }
  )
);

export const validateCreateMedicalReport = (data: unknown) => {
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
    finalVerdict: Joi.string(),
  });

  return schema.validate(data);
};
