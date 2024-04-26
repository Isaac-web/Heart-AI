import _ from 'lodash';
import { Request, Response } from 'express';
import { User, validateCreateUser } from '../models/User';
import bcrypt from 'bcrypt';

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

const login = async (req: Request, res: Response) => {};

const getUserInfo = async (req: Request, res: Response) => {};

const updateUser = async (req: Request, res: Response) => {};

const deleteAccount = async (req: Request, res: Response) => {};
