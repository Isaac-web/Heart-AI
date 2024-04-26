import _ from 'lodash';
import { Request, Response } from 'express';
import { User, validateCreateUser, validateUserLogin } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { error } = validateCreateUser(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(400).json({
      message: 'Email is already taken.',
    });

  const user = new User(
    _.pick(req.body, ['name', 'email', 'imageUrl', 'userType'])
  );

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;

  await user.save();

  user.password = '';

  return res.json({
    message: 'User registration was successful.',
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { error } = validateUserLogin(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json({
      message: 'Invalid username or password.',
    });

  const passwordIsValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!passwordIsValid)
    return res.status(400).json({
      message: 'Invalid username or password.',
    });

  const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET}`);

  res.json({
    message: 'You are logged in.',
    token: token,
  });
};

const getUserInfo = async (req: Request, res: Response) => {};

const updateUser = async (req: Request, res: Response) => {};

const deleteAccount = async (req: Request, res: Response) => {};
