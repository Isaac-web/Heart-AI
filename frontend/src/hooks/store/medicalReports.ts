import { StateCreator } from 'zustand';
import { MedicalReportSlice, StoreState } from './types';
import { handleError } from '@/utils/errorHandler';
import { fetchMedicalReports } from '@/api/medicalReports';

export const createMedicalReportsSlice: StateCreator<
  StoreState,
  [],
  [],
  MedicalReportSlice
> = (set, get) => ({
  medicalReports: [],
  loadingMedicalReports: false,
  async fetchMedicalReports(params = {}) {
    set({ loadingMedicalReports: true });

    try {
      const data = await fetchMedicalReports(params);
      get().removeError(fetchMedicalReports.name);
      set({ medicalReports: data });
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: fetchMedicalReports.name, message });
    } finally {
      set({ loadingMedicalReports: false });
    }
  },
});
