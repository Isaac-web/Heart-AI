import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { AppointmentEntity, StoreState } from '../types';
import { fetchAppointments, createAppointment } from '@/api/appointments';
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
  async fetchAppointments(params = {}) {
    try {
      get().removeError(this.fetchAppointments.name);

      set(
        produce((store: StoreState) => {
          store.entities.appointments.loading = true;
        })
      );

      const data = await fetchAppointments(params);

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
  async createAppointment(data) {
    try {
      get().removeError(this.createAppointment.name);

      set(
        produce((store: StoreState) => {
          store.entities.appointments.isPending = true;
        })
      );

      const appointment = await createAppointment(data);

      set(
        produce((store: StoreState) => {
          store.entities.appointments.data.push(appointment);
        })
      );

      return appointment;
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({ callingFunction: this.createAppointment.name, message });
    } finally {
      set(
        produce((store: StoreState) => {
          store.entities.appointments.isPending = false;
        })
      );
    }
  },
});
