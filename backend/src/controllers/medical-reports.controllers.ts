import { Request, Response } from 'express';

export const getMedicalReport = async (req: Request, res: Response) => {
  return res.json({
    successful: true,
    message: 'returning a single medical report to you of a user',
  });
};

export const getMedicalReports = async (req: Request, res: Response) => {
  return res.json({
    successful: true,
    message: 'returning multiple medical report to you of a user',
  });
};

export const getMyMedicalReport = async (req: Request, res: Response) => {
  return res.json({});
};

export const createMedicalReport = async (req: Request, res: Response) => {
  return res.json({});
};

export const updateMedicalReport = async (req: Request, res: Response) => {
  return res.json({});
};

export const deleteMedicalReport = async (req: Request, res: Response) => {
  return res.json({});
};
