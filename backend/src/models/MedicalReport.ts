// import { Schema, model } from 'mongoose';
// import Joi from 'joi';

// const MedicalReportSchema: Schema = new Schema(
//   {
//     doctor: {
//       type: Schema.Types.ObjectId,
//       ref: 'Doctor',
//       required: true,
//     },
//     patient: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     age: {
//       type: Number,
//       min: 0,
//       max: 100,
//       required: true,
//     },
//     sex: {
//       type: Number,
//       required: true,
//     },
//     trestbps: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     chol: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     fbs: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     restecg: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     thalach: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     exang: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     oldpeak: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     slope: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     ca: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     cp: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     thal: {
//       type: Number,
//       min: 0,
//       required: true,
//     },
//     cadioStatus: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

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

// export const validateUpdateMedicalReport = (data: unknown) => {
//   const schema = Joi.object({
//     patient: Joi.string(),
//     doctor: Joi.string(),
//     age: Joi.number().min(0),
//     sex: Joi.number(),
//     trestbps: Joi.number().min(0),
//     chol: Joi.number().min(0),
//     fbs: Joi.number().min(0),
//     restecg: Joi.number().min(0),
//     thalach: Joi.number().min(0),
//     exang: Joi.number().min(0),
//     oldpeak: Joi.number().min(0),
//     slope: Joi.number().min(0),
//     ca: Joi.number().min(0),
//     cp: Joi.number().min(0),
//     thal: Joi.number().min(0),
//   });

//   return schema.validate(data);
// };

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
    },
    { timestamps: true }
  )
);

// export const validateCreateMedicalReport = (data: unknown) => {
//   const schema = Joi.object({
//     age: Joi.number().min(16).max(120).required(),
//     sex: Joi.number().min(0).max(1).required(),
//     chestPainType: Joi.number().min(0).max(3).required(),
//     restingBloodPressure: Joi.number().min(94).max(200).required(),
//     serumColesterol: Joi.number().min(120).max(570).required(),
//     fastingBloodSugarLevel: Joi.number().min(0).max(1).required(),
//     restingElectrocardiographocResults: Joi.number().min(0).max(2).required(),
//     maximumHeartRate: Joi.number().min(60).max(220).required(),
//     exerciseInducedAngina: Joi.number().min(0).max(1).required(),
//     stDepression: Joi.number().min(0).max(7).required(),
//     slope: Joi.number().min(0).max(2).required(),
//     numberOfMajorVessels: Joi.number().min(0).max(4).required(),
//     thalliumStressTestResults: Joi.number().min(0).max(3).required(),
//   });

//   return schema.validate(data);
// };
