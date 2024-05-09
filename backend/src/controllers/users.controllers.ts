import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  User,
  validateCreateUser,
  validateUpdateUser,
  validateUserLogin,
} from '../models/User';
import { AppRequest, AppResponse } from '../types';

export const registerUser = async (req: AppRequest, res: AppResponse) => {
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

export const login = async (req: AppRequest, res: AppResponse) => {
  const { error } = validateUserLogin(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json({
      message: 'Invalid email or password.',
    });

  const passwordIsValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!passwordIsValid)
    return res.status(400).json({
      message: 'Invalid email or password.',
    });

  const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET}`);

  res.json({
    message: 'You are logged in.',
    token: token,
  });
};

export const getUserInfo = async (req: AppRequest, res: AppResponse) => {
  res.json({
    data: req.user,
  });
};

export const fetchUsers = async (req: AppRequest, res: AppResponse) => {
  const filter: { [key: string]: string } = {};

  const userType = req.query.userType || '';
  if (userType) filter.userType = userType as string;

  const users = await User.find(filter).select('-password');

  res.json({
    data: users,
  });
};

export const updateUser = async (req: AppRequest, res: AppResponse) => {
  const { error } = validateUpdateUser(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const authUser = req.user;
  if (!authUser)
    return res.status(404).json({
      message: 'Could not find user with the given id.',
    });

  const user = await User.findByIdAndUpdate(
    authUser._id,
    {
      $set: _.pick(req.body, ['name', 'imageUrl']),
    },
    { new: true }
  );

  if (!user)
    return res
      .status(404)
      .json({ message: 'Could not find user with the given id.' });

  res.json({
    data: user,
  });
};

export const deleteAccount = async (req: AppRequest, res: AppResponse) => {};

// npm run dev