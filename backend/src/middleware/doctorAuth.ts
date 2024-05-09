import {
  AppNextFunction,
  AppRequest,
  AppResponse,
  JwtAuthPayload,
  Doctor as DoctorInterface,
} from '../types';
import jwt from 'jsonwebtoken';
import { Doctor } from '../models/Doctor';

export const doctorAuth = async (
  req: AppRequest,
  res: AppResponse,
  next: AppNextFunction
) => {
  const authHeader = req.headers['authorization'] as string;
  if (!authHeader)
    return res.status(401).json({
      message: 'Access deined. No token provided.',
    });

  const [_, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as JwtAuthPayload;

    const user = (await Doctor.findById(decoded._id)) as DoctorInterface;
    user.password = '';

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token.',
    });
  }
};
