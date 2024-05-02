import _ from 'lodash';
import { Request, Response } from 'express';
import MedicalReport, {
  validateCreateMedicalReport,
  validateUpdateMedicalReport,
} from '../models/MedicalReport';
import { User } from '../models/User';
import { AppRequest } from '../types';
import axios from 'axios';
import config from 'config';
import { MedicalReportRequest } from '../models/MedicalReportRequest';

export const getMedicalReport = async (req: Request, res: Response) => {
  const medicalReport = await MedicalReport.findById(req.params.id);
  if (!medicalReport)
    return res.status(404).json({
      message: 'Could not find medical report with the given id.',
    });

  return res.json({
    successful: true,
    message: 'returning a single medical report to you of a user',
  });
};

export const getMedicalReports = async (req: AppRequest, res: Response) => {
  if (!req.query.doctorId)
    return res
      .status(400)
      .json({ message: 'doctorId in the query string is required.' });

  const medicalReports = await MedicalReport.find({
    doctorId: req.query.doctorId,
  })
    .populate('patientId', '-password')
    .populate('doctorId', '-password');

  return res.json({
    message: 'returning multiple medical report to you of a user',
    data: medicalReports,
  });
};

export const getMyMedicalReport = async (req: AppRequest, res: Response) => {
  const user = req.user;
  if (!user)
    return res.status(401).json({
      message: 'User is not defined.',
    });

  const medicalReports = await MedicalReport.find({ patientId: user._id });

  return res.json({
    message: 'returning multiple medical report to you of a user',
    data: medicalReports,
  });
};

export const createMedicalReport = async (req: Request, res: Response) => {
  const { error } = validateCreateMedicalReport(req.body);
  if (error)
    return res.status(404).json({
      message: error.details[0].message,
    });

  const [patient, doctor, reportRequest, existingReport] = await Promise.all([
    User.findOne({ _id: req.body.patientId, userType: 'patient' }),
    User.findOne({ _id: req.body.doctorId, userType: 'doctor' }),
    MedicalReportRequest.findOne({
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
    }),
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

  try {
    const { data } = await axios.post(
      config.get('predictionModelUrl'),
      _.pick(req.body, [
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

    if (data.prediction !== 'Your heart is fine, you do not have heart disease')
      req.body.cardioStatus = 1;
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong.',
    });
  }

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
      'cardioStatus',
    ])
  );

  if (reportRequest) {
    reportRequest.status = 1;
    await reportRequest.save();
  }

  return res.json({
    message: '1 medical report was added.',
    data: medicalReport,
  });
};

export const updateMedicalReport = async (req: Request, res: Response) => {
  const { error } = validateUpdateMedicalReport(req.body);
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const medicalReport = await MedicalReport.findByIdAndUpdate(
    req.params.id,
    {
      $set: _.pick(req.body, [
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
      ]),
    },
    { new: true }
  );

  if (!medicalReport)
    return res.status(404).json({
      message: 'Could not find medical record wih the given id.',
    });

  return res.json({
    message: '1 medical record was updated.',
    data: medicalReport,
  });
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
