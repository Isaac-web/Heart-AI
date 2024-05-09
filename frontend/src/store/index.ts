import { createDataSlice } from './createDataSlice';
import { createChatSessionsSlice } from './chatSessionsSlice';
import { createMedicalReportsSlice } from './medicalReports';
import { createMedicalReportRequestSlice } from './medicalReportRequests';
import { createAuthSlice } from './authSlice';
import { createErrorSlice } from './errorSlice';
import { createUserSlice } from './usersSlice';
import { createChatMessagesSlice } from './chatMessagesSlice';
import { create } from 'zustand';
import { StoreState } from './types';

export const useAppStore = create<StoreState>()((...a) => ({
  ...createErrorSlice(...a),
  ...createAuthSlice(...a),
  ...createUserSlice(...a),
  ...createMedicalReportRequestSlice(...a),
  ...createMedicalReportsSlice(...a),
  ...createChatSessionsSlice(...a),
  ...createChatMessagesSlice(...a),
  ...createDataSlice(...a),
}));