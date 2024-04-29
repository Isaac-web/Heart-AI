import { StateCreator } from 'zustand';
import { AuthSlice, StoreState } from './types';
import { login, register } from '@/api/auth';
import { handleError } from '@/utils/errorHandler';

export const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (
  _,
  get
) => ({
  login: async (data) => {
    try {
      get().removeError(login.name);
      await login(data);
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: login.name, message });
    }
  },
  register: async (data) => {
    try {
      get().removeError(register.name);
      await register(data);
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: register.name, message });
    }
  },
});
