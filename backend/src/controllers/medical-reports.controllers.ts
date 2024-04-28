import _ from 'lodash';
import { Request, Response } from 'express';
import MedicalReport, {
  validateCreateMedicalReport,
} from '../models/MedicalReport';
import { User } from '../models/User';

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
  const { error } = validateCreateMedicalReport(req.body);
  if (error)
    return res.status(404).json({
      message: error.details[0].message,
    });

  const [patient, doctor, existingReport] = await Promise.all([
    User.findOne({ _id: req.body.patientId, userType: 'patient' }),
    User.findOne({ _id: req.body.doctorId, userType: 'doctor' }),
    MedicalReport.findOne(_.pick(req.body, ['patientId', 'doctorId'])),
  ]);

  if (!patient)
    return res
      .status(404)
      .json({ message: 'Patient with the given Id cannot be found.' });

  if (!doctor)
    return res
      .status(404)
      .json({ message: 'Doctor with the given Id cannot be found.' });

  if (existingReport)
    return res.status(400).json({
      message: 'Medical report already exists from this doctor.',
    });

  const medicalReport = await MedicalReport.create(
    _.pick(req.body, [
      'patientId',
      'doctorId',
      'age',
      'sex',
      'cp_1',
      'cp_2',
      'cp_3',
      'trestbps',
      'chol',
      'fbs',
      'thalach',
      'exang',
      'oldpeak',
      'slope',
      'ca',
      'thal_1',
      'thal_2',
      'thal_3',
      'restecg_1',
      'restecg_2',
      'restecg_3',
    ])
  );

  return res.json({
    message: '1 medical report was added.',
    data: medicalReport,
  });
};

export const updateMedicalReport = async (req: Request, res: Response) => {
  return res.json({});
};

export const deleteMedicalReport = async (req: Request, res: Response) => {
  const medicalReport = await MedicalReport.findByIdAndDelete(req.params.id);
  if (!medicalReport)
    return res.status(404).json({
      message: 'Could not find medical report with the given id.',
    });

  return res.json({
    message: '1 medical report was deleted.',
    data: medicalReport,
  });
};
