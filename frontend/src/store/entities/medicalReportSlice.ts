import { MedicalReportFormData } from '@/types';
import { StateCreator } from 'zustand';
import { MedicalReportEntity, StoreState } from '../types';
import {
  createMedicalReport,
  fetchMedicalReports,
  getCurrentUserMedicalReports,
} from '@/api/medicalReports';
import { handleError } from '@/utils/errorHandler';
import { produce } from 'immer';

export const medicalReportSlice: StateCreator<
  StoreState,
  [],
  [],
  MedicalReportEntity
> = (set, get) => ({
  loading: false,
  isPending: false,
  data: [],
  async createMedicalReport(data: MedicalReportFormData) {
    try {
      get().removeError(this.createMedicalReport.name);
      set(
        produce((store: StoreState) => {
          store.entities.medicalReports.isPending = true;
        })
      );
      const medicalReport = await createMedicalReport(data);

      return medicalReport;
    } catch (err) {
      const message = handleError(err as Error);

      get().addError({
        callingFunction: this.createMedicalReport.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.medicalReports.isPending = false;
        })
      );
    }
  },
  async fetchMedicalReports(params) {
    try {
      get().removeError(this.fetchMedicalReports.name);
      set(
        produce((store: StoreState) => {
          store.entities.medicalReports.loading = true;
        })
      );
      const data = await fetchMedicalReports(params);

      console.log(data);

      set(
        produce((store: StoreState) => {
          store.entities.medicalReports.data = data;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);

      get().addError({
        callingFunction: this.fetchMedicalReports.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.medicalReports.loading = false;
        })
      );
    }
  },
  async fetchCurrentUserMedicalReports() {
    try {
      get().removeError(this.fetchCurrentUserMedicalReports.name);
      set(
        produce((store: StoreState) => {
          store.entities.medicalReports.loading = true;
        })
      );

      const data = await getCurrentUserMedicalReports();

      set(
        produce((store: StoreState) => {
          store.entities.medicalReports.data = data;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);

      get().addError({
        callingFunction: this.fetchCurrentUserMedicalReports.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.medicalReports.loading = false;
        })
      );
    }
  },
});
