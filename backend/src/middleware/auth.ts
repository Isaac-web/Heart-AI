import {
  AppNextFunction,
  AppRequest,
  AppResponse,
  JwtAuthPayload,
} from '../types';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Doctor } from '../models/Doctor';

export const auth = async (
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

    const [patient, doctor] = await Promise.all([
      User.findById(decoded._id),
      Doctor.findById(decoded._id),
    ]);

    if (!patient && !doctor)
      return res.status(401).json({ message: 'Access Denied.' });

    if (patient)
      req.user = {
        _id: patient._id.toString(),
        email: patient.email,
        userType: 'patient',
      };
    else if (doctor)
      req.user = {
        _id: doctor._id.toString(),
        email: doctor.email,
        userType: 'doctor',
      };

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token.',
    });
  }
};
