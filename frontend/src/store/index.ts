import { createDataSlice } from './createDataSlice';
import { createMedicalReportsSlice } from './medicalReports';
import { createAuthSlice } from './auth/authSlice';
import { createErrorSlice } from './errorSlice';
import { createUserSlice } from './usersSlice';
import { createChatMessagesSlice } from './chatMessagesSlice';
import { create } from 'zustand';
import { StoreState } from './types';

export const useAppStore = create<StoreState>()((...a) => ({
  ...createErrorSlice(...a),
  ...createAuthSlice(...a),
  ...createUserSlice(...a),
  ...createMedicalReportsSlice(...a),
  ...createChatMessagesSlice(...a),
  ...createDataSlice(...a),
}));
