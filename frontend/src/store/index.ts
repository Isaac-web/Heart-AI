import { createAnalyticsSlice } from './analytics/index';
import { createAppDataSlice } from './app/index';
import { create } from 'zustand';
import { StoreState } from './types';
import { createDataSlice } from './createDataSlice';
import { createAuthSlice } from './auth/authSlice';
import { createErrorSlice } from './errorSlice';

export const useAppStore = create<StoreState>()((...a) => ({
  ...createErrorSlice(...a),
  ...createAuthSlice(...a),
  ...createDataSlice(...a),
  ...createAppDataSlice(...a),
  ...createAnalyticsSlice(...a),
}));
