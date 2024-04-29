import { createMedicalReportsSlice } from './medicalReports';
import { createMedicalReportRequestSlice } from './medicalReportRequests';
import { createAuthSlice } from './authSlice';
import { createErrorSlice } from './errorSlice';
import { createUserSlice } from './usersSlice';
import { create } from 'zustand';
import { StoreState } from './types';

export const useAppStore = create<StoreState>()((...a) => ({
  ...createErrorSlice(...a),
  ...createAuthSlice(...a),
  ...createUserSlice(...a),
  ...createMedicalReportRequestSlice(...a),
  ...createMedicalReportsSlice(...a),
}));
