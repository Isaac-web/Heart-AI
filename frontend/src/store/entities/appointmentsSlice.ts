import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { AppointmentEntity, StoreState } from '../types';
import { fetchAppointments } from '@/api/appointments';
import { handleError } from '@/utils/errorHandler';

export const appointmentSlice: StateCreator<
  StoreState,
  [],
  [],
  AppointmentEntity
> = (set, get) => ({
  loading: false,
  isPending: false,
  skip: 0,
  limit: 0,
  total: 0,
  data: [],
  async fetchAppointments() {
    try {
      get().removeError(this.fetchAppointments.name);

      set(
        produce((store: StoreState) => {
          store.entities.appointments.loading = true;
        })
      );

      const data = await fetchAppointments();

      set(
        produce((store: StoreState) => {
          store.entities.appointments.data = data;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: this.fetchAppointments.name, message });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.appointments.loading = false;
        })
      );
    }
  },
});
