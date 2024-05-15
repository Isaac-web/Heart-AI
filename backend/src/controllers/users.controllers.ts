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

  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({
      message: 'Passwords donnot match.',
    });

  const user = new User(
    _.pick(req.body, [
      'name',
      'email',
      'phone',
      'sex',
      'age',
      'imageUrl',
      'userType',
    ])
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

  user.password = '';

  res.json({
    message: 'You are logged in.',
    token: token,
    data: user,
  });
};

export const getUserInfo = async (req: AppRequest, res: AppResponse) => {
  res.json({
    data: req.user,
  });
};

export const fetchUsers = async (req: AppRequest, res: AppResponse) => {
  const filter: { [key: string]: string } = {};

  const name = req.query.name
    ? new RegExp(req.query.name as string, 'i')
    : undefined;

  if (name) filter.name = name as unknown as string;

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
      $set: _.pick(req.body, ['name', 'sex', 'phone', 'age', 'imageUrl']),
    },
    { new: true }
  );

  if (!user)
    return res
      .status(404)
      .json({ message: 'Could not find user with the given id.' });

  user.password = '';

  res.json({
    data: user,
  });
};

export const deleteUser = async (req: AppRequest, res: AppResponse) => {
  try {
    const authUser = req.user;

    !authUser &&
      res.status(401).json({
        message: 'You are not authorized to delete this account.',
      });

    await User.findByIdAndDelete(authUser?._id);

    res.status(200).json({
      data: {},
      message: 'Your account has been deleted.',
    });
  } catch (err: any) {
    res.status(500).json({
      message: `server error: ${err?.message}`,
    });
  }
};

// npm run dev
