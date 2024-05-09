import mongoose from 'mongoose';
import Joi from 'joi';

export const MedicalReportRequest = mongoose.model(
  'MedicalReportRequest',
  new mongoose.Schema(
    {
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
      },
      appointmentDate: {
        type: Date,
        required: true,
      },
      status: {
        type: Number,
        min: 0,
        max: 1,
        default: 0,
      },
    },
    { timestamps: true }
  )
);

export const validateCreateMedicalReportRequest = (data: unknown) => {
  const schema = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    appointmentDate: Joi.date().min(Date.now()).required(),
  });

  return schema.validate(data);
};
