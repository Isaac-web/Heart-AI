import _ from 'lodash';
import {
  MedicalReportRequest,
  validateCreateMedicalReportRequest,
} from '../models/MedicalReportRequest';
import { User } from '../models/User';
import { AppRequest, AppResponse } from '../types';

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
    User.findOne({ _id: req.body.patientId, userType: 'patient' }),
    User.findOne({ _id: req.body.doctorId, userType: 'doctor' }),
    MedicalReportRequest.findOne(_.pick(req.body, ['patientId', 'doctorId'])),
  ]);

  if (!patient)
    return res
      .status(404)
      .json({ message: 'Patient with the given Id cannot be found.' });

  if (!doctor)
    return res
      .status(404)
      .json({ message: 'Doctor with the given Id cannot be found.' });

  if (existingRequest)
    return res.status(400).json({
      message:
        'There is already a request from the given user to the given doctor.',
    });

  const medicalReportRequest = await MedicalReportRequest.create(
    _.pick(req.body, ['patientId', 'doctorId'])
  );

  patient.password = '';
  doctor.password = '';

  res.json({
    message: 'Medical Report Request Sent.',
    data: {
      ...medicalReportRequest.toObject(),
      patientId: patient,
      doctorId: doctor,
    },
  });
};

export const fetchMedicalReportRequest = async (
  req: AppRequest,
  res: AppResponse
) => {
  const { doctorId } = req.query;
  if (!doctorId)
    return res.status(404).json({
      message: 'doctorId is required in the query string.',
    });

  const reportRequests = await MedicalReportRequest.find({ doctorId })
    .populate('doctorId', '-password')
    .populate('patientId', '-password');

  res.json({
    data: reportRequests,
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
