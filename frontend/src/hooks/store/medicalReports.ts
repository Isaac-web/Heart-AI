import { StateCreator } from 'zustand';
import { StoreState, UsersSlice } from './types';
import { fetchUsers } from '@/api/users';
import { handleError } from '@/utils/errorHandler';

export const createMedicalReportSlice: StateCreator<
  StoreState,
  [],
  [],
  UsersSlice
> = (set) => ({
  users: [],
  fetchUsers: async (params = {}) => {
    try {
      const usersData = await fetchUsers(params);

      set({ users: usersData });
    } catch (err) {
      handleError(err as Error);
    }
  },
});
