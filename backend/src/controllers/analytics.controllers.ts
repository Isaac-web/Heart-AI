import { MedicalReport } from '../models/MedicalReport';
import { MedicalReportRequest } from '../models/MedicalReportRequest';
import { AppRequest, AppResponse } from '../types';

export const getDoctorSummary = async (req: AppRequest, res: AppResponse) => {
  const doctorId = req.user?._id;

  const [pendingAppointments, healthyReports, unhealthyReports] =
    await Promise.all([
      MedicalReportRequest.find({
        doctor: doctorId,
        status: 0,
      }).countDocuments(),
      MedicalReport.find({ doctor: doctorId, cadioStatus: 0 }).countDocuments(),
      MedicalReport.find({ doctor: doctorId, cadioStatus: 1 }).countDocuments(),
    ]);

  res.json({
    message: 'Hello World',
    data: {
      pendingAppointments,
      healthyReports,
      unhealthyReports,
    },
  });
};
