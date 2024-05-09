import { StateCreator } from 'zustand';
import { AppointmentDetail, StoreState } from '../types';

export const appointmentDetailSlice: StateCreator<
  StoreState,
  [],
  [],
  AppointmentDetail
> = () => ({
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
  async getAppointmentById(id) {},
});
