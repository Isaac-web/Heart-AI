import _ from 'lodash';
import {
  MedicalReportRequest,
  validateCreateMedicalReportRequest,
} from '../models/MedicalReportRequest';
import { User } from '../models/User';
import { AppRequest, AppResponse } from '../types';
import { Doctor } from '../models/Doctor';

export const createMedicalReportRequest = async (
  req: AppRequest,
  res: AppResponse
) => {
  const { error } = validateCreateMedicalReportRequest(req.body);

  if (error)
    return res.status(422).json({
      message: error.details[0].message,
    });

  const [patient, doctor, existingRequest] = await Promise.all([
    User.findOne({ _id: req.body.patientId }),
    Doctor.findOne({ _id: req.body.doctorId }),
    MedicalReportRequest.findOne({
      patient: req.body.patientId,
      doctor: req.body.doctorId,
    }),
  ]);

  if (!patient)
    return res
      .status(404)
      .json({ message: 'Patient with the given Id cannot be found.' });

  if (!doctor)
    return res
      .status(404)
      .json({ message: 'Doctor with the given Id cannot be found.' });

  // if (existingRequest)
  //   return res.status(400).json({
  //     message: 'There is already an appointment with this doctor.',
  //   });

  const medicalReportRequest = await MedicalReportRequest.create({
    doctor: req.body.doctorId,
    patient: req.body.patientId,
    appointmentDate: req.body.appointmentDate,
  });

  patient.password = '';
  doctor.password = '';

  res.json({
    message: 'Medical Report Request Sent.',
    data: {
      ...medicalReportRequest.toObject(),
      patient,
      doctor,
    },
  });
};

export const fetchUserMedicalReportRequest = async (
  req: AppRequest,
  res: AppResponse
) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'User is not logged in.' });

  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 20;
  const [reportRequests, count] = await Promise.all([
    MedicalReportRequest.find({ patient: user._id })
      .populate('doctor', '-password')
      .populate('patient', '-password'),
    MedicalReportRequest.find({ patient: user._id }).countDocuments(),
  ]);

  res.json({
    skip,
    limit,
    total: count,
    data: reportRequests,
  });
};
export const fetchMedicalReportRequest = async (
  req: AppRequest,
  res: AppResponse
) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 20;

  const filter: { doctor?: string; patient?: string } = {};

  const { doctorId, patientId } = req.query;

  if (doctorId) filter.doctor = doctorId as string;
  if (patientId) filter.patient = patientId as string;

  const [reportRequests, count] = await Promise.all([
    MedicalReportRequest.find(filter)
      .skip(skip)
      .limit(limit)
      .populate('doctor', '-password')
      .populate('patient', '-password'),
    MedicalReportRequest.find(filter).countDocuments(),
  ]);

  res.json({
    skip,
    limit,
    total: count,
    data: reportRequests,
  });
};

export const getMedicalReportRequestById = async (
  req: AppRequest,
  res: AppResponse
) => {
  const medicalReportRequest = await MedicalReportRequest.findById(
    req.params.id
  )
    .populate('doctor', '-password')
    .populate('patient', '-password');

  if (!medicalReportRequest)
    return res.status(404).json({
      message: 'Could not find medical report request with the given id.',
    });

  res.json({
    data: medicalReportRequest,
  });
};

export const deleteMedicalReportRequest = async (
  req: AppRequest,
  res: AppResponse
) => {
  const medicalReportRequest = await MedicalReportRequest.findByIdAndDelete(
    req.params.id
  );
  if (!medicalReportRequest)
    return res.status(404).json({
      message: 'Could not find medical report request with the given id.',
    });

  res.json({
    message: '1 medical report request was deleted.',
    data: deleteMedicalReportRequest,
  });
};
