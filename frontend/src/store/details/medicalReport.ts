import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { MedicalReportDetail, StoreState } from '../types';
import {
  getMedicalReportById,
  updateMedicalReport,
} from '@/api/medicalReports';
import { handleError } from '@/utils/errorHandler';

export const medicalReportDetailSlice: StateCreator<
  StoreState,
  [],
  [],
  MedicalReportDetail
> = (set, get) => ({
  loading: false,
  isPending: false,
  data: {
    _id: '',
    cadioStatus: 0,
    status: '',
    confidenceLevel: 0,
    patient: {
      _id: '',
      name: '',
      age: 0,
      sex: 0,
      email: '',
      phone: '',
      userType: '',
      createdAt: '',
    },
    doctor: {
      _id: '',
      name: '',
      age: 0,
      sex: 0,
      email: '',
      phone: '',
      hospital: '',
      supportingDocumentUrl: '',
      bio: '',
      createdAt: '',
    },
    details: {
      age: 0,
      sex: 0,
      chestPainType: 0,
      restingBloodPressure: 0,
      serumColesterol: 0,
      fastingBloodSugarLevel: 0,
      restingElectrocardiographocResults: 0,
      maximumHeartRate: 0,
      exerciseInducedAngina: 0,
      stDepression: 0,
      slope: 0,
      numberOfMajorVessels: 0,
      thalliumStressTestResults: 0,
    },
    finalVerdict: '',
    createdAt: '',
  },
  async getMedicalReportById(id) {
    get().removeError(this.getMedicalReportById.name);

    try {
      set(
        produce((store: StoreState) => {
          store.details.medicalReport.loading = true;
        })
      );

      const medicalReport = await getMedicalReportById(id);

      set(
        produce((store: StoreState) => {
          store.details.medicalReport.data = medicalReport;
        })
      );

      return medicalReport;
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.getMedicalReportById.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.details.medicalReport.loading = false;
        })
      );
    }
  },
  async updateMedicalReport(id, data) {
    get().removeError(this.updateMedicalReport.name);

    try {
      set(
        produce((store: StoreState) => {
          store.details.medicalReport.isPending = true;
        })
      );

      const medicalReport = await updateMedicalReport(id, data);

      set(
        produce((store: StoreState) => {
          store.details.medicalReport.data = medicalReport;
        })
      );

      return medicalReport;
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.updateMedicalReport.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.details.medicalReport.isPending = false;
        })
      );
    }
  },
});
