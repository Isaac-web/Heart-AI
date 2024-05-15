import { StateCreator } from 'zustand';
import { PatientsSlice, StoreState } from '../types';
import { handleError } from '@/utils/errorHandler';
import { produce } from 'immer';
import { fetchUsers } from '@/api/users';

export const patientsSlice: StateCreator<StoreState, [], [], PatientsSlice> = (
  set,
  get
) => ({
  loading: false,
  isPending: false,
  data: [],
  async fetchPatients() {
    get().removeError(this.fetchPatients.name);

    set(
      produce((store: StoreState) => {
        store.entities.patients.loading = true;
      })
    );
    try {
      const patients = await fetchUsers();
      set(
        produce((store: StoreState) => {
          store.entities.patients.data = patients;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.fetchPatients.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.patients.loading = false;
        })
      );
    }
  },
});
