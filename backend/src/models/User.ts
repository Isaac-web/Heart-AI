import mongoose from 'mongoose';
import Joi from 'joi';

export const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: {
        type: String,
        maxlength: 256,
        trim: true,
        default: '',
      },
      email: {
        type: String,
        minlength: 3,
        maxlength: 256,
        unique: true,
        trim: true,
        required: true,
      },
      phone: {
        type: String,
        maxlength: 15,
        default: '',
      },
      age: {
        type: Number,
        min: 0,
        max: 120,
        default: 0,
      },
      sex: {
        type: Number,
        min: 0,
        max: 1,
        default: 1,
      },
      password: {
        type: String,
        minlength: 3,
        maxlength: 1024,
        required: true,
      },
      imageUrl: {
        type: String,
        maxlength: 1024,
      },
      userType: {
        type: String,
        enum: ['patient', 'admin'],
        default: 'patient',
      },
    },
    { timestamps: true }
  )
);

export const validateCreateUser = (user: unknown) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(256),
    email: Joi.string().email().max(256).required(),
    phone: Joi.string().max(15),
    password: Joi.string().min(7).max(256).required(),
    confirmPassword: Joi.string().min(7).max(256).required(),
    userType: Joi.string().min(3).max(10),
    imageUrl: Joi.string().min(256).max(1024),
    sex: Joi.number().min(0).max(1),
    age: Joi.number().min(0).max(120),
  });

  return schema.validate(user);
};

export const validateUpdateUser = (user: unknown) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(256),
    sex: Joi.number().min(0).max(1),
    phone: Joi.string().max(15),
    age: Joi.number().min(0).max(120),
    imageUrl: Joi.string().min(256).max(1024),
  });

  return schema.validate(user);
};

export const validateUserLogin = (credentials: unknown) => {
  const schema = Joi.object({
    email: Joi.string().email().max(256).required(),
    password: Joi.string().min(7).max(256).required(),
  });

  return schema.validate(credentials);
};
