import { StateCreator } from 'zustand';
import { AuthSlice, StoreState } from './types';
import { login } from '@/api/auth';
import { AxiosError } from 'axios';

const getErrorMessage = (
  error: AxiosError<{ message?: string }>
): string | null => {
  if (!error) return null;

  if (!error.response) return error.message;

  return error.response.data.message || null;
};

const handleError = (err: Error): string => {
  if (err instanceof AxiosError) {
    const message = getErrorMessage(err);
    if (message) return message;
  }
  return 'Something went wrong.';
};

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
});
