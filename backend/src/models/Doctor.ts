import mongoose from 'mongoose';
import Joi from 'joi';

export const Doctor = mongoose.model(
  'Doctor',
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        maxlength: 256,
        default: '',
        trim: true,
      },
      lastName: {
        type: String,
        maxlength: 256,
        default: '',
        trim: true,
      },
      age: {
        type: Number,
        min: 18,
        default: 18,
      },
      sex: {
        type: Number,
        min: 0,
        max: 1,
        default: 1,
      },
      phone: {
        type: String,
        maxlength: 15,
        default: '',
        trim: true,
      },
      hospital: {
        type: String,
        default: '',
      },
      supportingDocumentUrl: {
        type: String,
        default: '',
      },
      bio: {
        type: String,
        maxlength: 1024,
        trim: true,
        default: '',
      },
      email: {
        type: String,
        maxlength: 256,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        maxlength: 1024,
        minlength: 7,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export const validateDoctorSignUp = (data: unknown) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).max(256).required(),
    confirmPassword: Joi.string().min(7).max(256).required(),
  });

  return schema.validate(data);
};

export const validateDoctorLogin = (credentials: unknown) => {
  const schema = Joi.object({
    email: Joi.string().email().max(256).required(),
    password: Joi.string().min(7).max(256).required(),
  });

  return schema.validate(credentials);
};

export const validateUpdateDoctor = (data: unknown) => {
  const schema = Joi.object({
    firstName: Joi.string().max(256),
    lastName: Joi.string().max(256),
    age: Joi.string().max(256),
    sex: Joi.number().min(0).max(1),
    phone: Joi.string().min(3).max(15),
    bio: Joi.string().max(1024),
    hospital: Joi.string().max(256),
    supportingDocumentUrl: Joi.string(),
  });

  return schema.validate(data);
};
