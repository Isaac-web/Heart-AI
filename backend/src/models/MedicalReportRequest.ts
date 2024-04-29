import mongoose from 'mongoose';
import Joi from 'joi';

export const MedicalReportRequest = mongoose.model(
  'MedicalReportRequest',
  new mongoose.Schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
    },
  })
);

export const validateCreateMedicalReportRequest = (data: unknown) => {
  const schema = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
  });

  return schema.validate(data);
};
