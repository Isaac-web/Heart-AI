import {
  AppNextFunction,
  AppRequest,
  AppResponse,
  JwtAuthPayload,
  User as UserInterface,
} from '../types';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const auth = async (
  req: AppRequest,
  res: AppResponse,
  next: AppNextFunction
) => {
  const authHeader = req.headers['authorization'] as string;

  const [_, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as JwtAuthPayload;

    const user = (await User.findById(decoded._id)) as UserInterface;
    user.password = '';

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token.',
    });
  }
};
