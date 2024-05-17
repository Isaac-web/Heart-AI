import _ from 'lodash';
import { Request, Response } from 'express';
import {
  MedicalReport,
  validateCreateMedicalReport,
} from '../models/MedicalReport';
import { User } from '../models/User';
import { AppRequest } from '../types';
import axios from 'axios';
import config from 'config';
import { MedicalReportRequest } from '../models/MedicalReportRequest';
import { Doctor } from '../models/Doctor';

export const getMedicalReport = async (req: Request, res: Response) => {
  const medicalReport = await MedicalReport.findById(req.params.id)
    .populate('patient', '-password')
    .populate('doctor', '-password');
  if (!medicalReport)
    return res.status(404).json({
      message: 'Could not find medical report with the given id.',
    });

  return res.json({
    data: medicalReport,
  });
};

export const getMedicalReports = async (req: AppRequest, res: Response) => {
  const { doctorId } = req.query;
  const filter: { [key: string]: string } = {};
  if (doctorId) filter.doctor = doctorId as string;

  const medicalReports = await MedicalReport.find(filter)
    .populate('patient', '-password')
    .populate('doctor', '-password');

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

  const medicalReports = await MedicalReport.find({ patient: user._id })
    .populate('patient', '-password')
    .populate('doctor', '-password');

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
    User.findOne({ _id: req.body.patient }),
    Doctor.findOne({ _id: req.body.doctor }),
    MedicalReportRequest.findOne({
      doctorId: req.body.doctorId,
      patientId: req.body.patientId,
      status: 0,
    }),
    MedicalReport.findOne(_.pick(req.body, ['patient', 'doctor'])),
  ]);

  if (!patient)
    return res
      .status(404)
      .json({ message: 'Patient with the given Id cannot be found.' });

  if (patient.age < 16)
    return res.json({ message: 'Minimum age for patient is 16.' });
  req.body.age = patient.age || 18;
  req.body.sex = patient.sex || 1;

  if (!doctor)
    return res
      .status(404)
      .json({ message: 'Doctor with the given Id cannot be found.' });

  let medicalReport: any = null;
  try {
    const { data } = await axios.post(
      config.get('predictionModelUrl'),
      _.pick(req.body, [
        'age',
        'sex',
        'cp',
        'trestbps',
        'chol',
        'fbs',
        'restecg',
        'thalach',
        'exang',
        'oldpeak',
        'slope',
        'ca',
        'thal',
      ])
    );

    medicalReport = await MedicalReport.create({
      status: data.status,
      cadioStatus:
        data.status === 'Unfortunately, you have heart disease' ? 1 : 0,
      confidenceLevel: Math.round(Number(data.confidence_level)),
      patient: req.body.patient,
      doctor: req.body.doctor,
      details: {
        age: data.details['age'],
        sex: data.details['sex'],
        chestPainType: data.details['chest pain type'],
        restingBloodPressure: data.details['resting blood pressure'],
        serumColesterol: data.details['serum colesterol'],
        fastingBloodSugarLevel: data.details['fasting blood sugar level'],
        restingElectrocardiographocResults:
          data.details['resting electrocardiographoc results'],
        maximumHeartRate: data.details['maximum heart rate'],
        exerciseInducedAngina: data.details['exercise induced agina'],
        stDepression: data.details['st depression'],
        slope: data.details['slope'],
        numberOfMajorVessels: data.details['number of major vessels'],
        thalliumStressTestResults: data.details['thallium stress test_results'],
      },
    });

    // console.log(reportRequest?._id);

    if (reportRequest) {
      await MedicalReportRequest.findByIdAndUpdate(
        reportRequest._id,
        {
          $set: {
            status: 1,
          },
        },
        { new: true }
      );
    }

    req.body.cardioStatus = data.status;
  } catch (err: any) {
    console.log('There was an Error: ', err.response);
    return res.status(500).json({
      message: 'Something went wrong.',
    });
  }

  patient.password = '';
  doctor.password = '';

  medicalReport.patient = patient;
  medicalReport.doctor = doctor;

  return res.json({
    message: '1 medical report was added.',
    data: medicalReport,
  });
};

export const updateMedicalReport = async (req: Request, res: Response) => {
  const { error } = req.body;
  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const medicalReport = await MedicalReport.findByIdAndUpdate(
    req.params.id,
    {
      $set: _.pick(req.body, [
        'cp',
        'trestbps',
        'chol',
        'fbs',
        'restecg',
        'thalach',
        'exang',
        'oldpeak',
        'slope',
        'ca',
        'thal',
        'finalVerdict',
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
