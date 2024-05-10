import { StateCreator } from 'zustand';
import { AuthSlice, StoreState } from '../types';
// import { getCurrentUser, login, register } from '@/api/auth';

import { doctorAuthSlice } from './doctorAuthSlice';

export const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (
  ...a
) => ({
  auth: {
    doctor: doctorAuthSlice(...a),
    user: {
      name: '',
    },
  },
});
