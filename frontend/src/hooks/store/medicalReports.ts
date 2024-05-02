import { StateCreator } from 'zustand';
import { MedicalReportSlice, StoreState } from './types';
import { handleError } from '@/utils/errorHandler';
import { createMedicalReport, fetchMedicalReports } from '@/api/medicalReports';

export const createMedicalReportsSlice: StateCreator<
  StoreState,
  [],
  [],
  MedicalReportSlice
> = (set, get) => ({
  medicalReports: [],
  loadingMedicalReports: false,
  creatingMedicalReport: false,
  async fetchMedicalReports(params = {}) {
    set({ loadingMedicalReports: true });
    try {
      get().removeError(fetchMedicalReports.name);
      const data = await fetchMedicalReports(params);
      set({ medicalReports: data });
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: fetchMedicalReports.name, message });
    } finally {
      set({ loadingMedicalReports: false });
    }
  },
  async createMedicalReport(data) {
    set({ creatingMedicalReport: true });
    try {
      get().removeError(createMedicalReport.name);
      await createMedicalReport(data);
    } catch (err) {
      const message = handleError(err as Error);
      console.log(message);
      get().addError({ callingFunction: createMedicalReport.name, message });
    } finally {
      set({ creatingMedicalReport: false });
    }
  },
});
