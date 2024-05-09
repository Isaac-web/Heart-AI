import { StateCreator } from 'zustand';
import { AuthSlice, StoreState } from './types';
import { getCurrentUser, login, register } from '@/api/auth';
import { handleError } from '@/utils/errorHandler';

export const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (
  set,
  get
) => ({
  authPending: false,
  loadingCurrentUser: false,
  currentUser: null,
  login: async (data) => {
    set({ authPending: true });
    try {
      get().removeError(login.name);
      await login(data);
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: login.name, message });
    } finally {
      set({ authPending: false });
    }
  },
  register: async (data) => {
    set({ authPending: true });
    try {
      get().removeError(register.name);
      await register(data);
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: register.name, message });
    } finally {
      set({ authPending: false });
    }
  },
  async getCurrentUser() {
    get().removeError(getCurrentUser.name);

    try {
      set({ loadingCurrentUser: true });
      const user = await getCurrentUser();
      set({ currentUser: user });
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: getCurrentUser.name, message });
    } finally {
      set({ loadingCurrentUser: false });
    }
  },
});
