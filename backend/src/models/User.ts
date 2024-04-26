import mongoose from 'mongoose';

export const User = mongoose.model(
  'User',
  new mongoose.Schema({
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
  })
);
