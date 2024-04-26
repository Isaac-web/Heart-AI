import mongoose from 'mongoose';
import Joi from 'joi';

export const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: {
        type: String,
        minlength: 3,
        maxlength: 256,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        minlength: 3,
        maxlength: 256,
        trim: true,
        required: true,
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
        enum: ['patient', 'doctor'],
      },
    },
    { timestamps: true }
  )
);

export const validateCreateUser = (user: unknown) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(256).required(),
    email: Joi.string().email().max(256).required(),
    password: Joi.string().min(7).max(256).required(),
    userType: Joi.string().min(3).max(10).required(),
    imageUrl: Joi.string().min(256).max(1024),
  });

  return schema.validate(user);
};

export const validateUpdateUser = (user: unknown) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(256),
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
