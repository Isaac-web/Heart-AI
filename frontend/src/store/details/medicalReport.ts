import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { MedicalReportDetail, StoreState } from '../types';
import { getMedicalReportById } from '@/api/medicalReports';
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
    cardioStatus: 0,
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
      firstName: '',
      lastName: '',
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
});
