import { StateCreator } from 'zustand';
import { AppointmentDetail, StoreState } from '../types';
import { handleError } from '@/utils/errorHandler';
import { getAppoitmentById } from '@/api/appoitmentDetail';
import { produce } from 'immer';

export const appointmentDetailSlice: StateCreator<
  StoreState,
  [],
  [],
  AppointmentDetail
> = (set, get) => ({
  loading: false,
  isPending: false,
  data: {
    _id: '',
    patient: {
      _id: '',
      name: '',
      email: '',
      createdAt: '',
      updatedAt: '',
    },
    doctor: {
      _id: '',
      firstName: '',
      lastName: '',
      age: NaN,
      sex: NaN,
      phone: '',
      hospital: '',
      supportingDocumentUrl: '',
      bio: '',
      email: '',
      createdAt: '',
      updatedAt: '',
    },
    appointmentDate: '',
  },
  async getAppointmentById(id) {
    try {
      get().removeError(this.getAppointmentById.name);
      set(
        produce((store: StoreState) => {
          store.details.appointment.loading = true;
        })
      );

      const data = await getAppoitmentById(id);

      set(
        produce((store: StoreState) => {
          store.details.appointment.data = data;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.getAppointmentById.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.details.appointment.loading = false;
        })
      );
    }
  },
});
