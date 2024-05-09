import { StateCreator } from 'zustand';
import { DoctorAuth, StoreState } from '../types';
import { registerDoctor, updateDoctor } from '@/api/auth';
import { handleError } from '@/utils/errorHandler';
import { produce } from 'immer';

export const doctorAuthSlice: StateCreator<StoreState, [], [], DoctorAuth> = (
  set,
  get
) => ({
  loading: false,
  isPending: false,
  data: {
    _id: '',
    firstName: '',
    lastName: '',
    age: 0,
    sex: 0,
    phone: '',
    hospital: '',
    supportingDocumentUrl: '',
    bio: '',
    email: '',
    password: '',
    createdAt: '',
  },
  async login() {},
  async register(data) {
    try {
      get().removeError(this.register.name);

      const res = await registerDoctor(data);
      localStorage.setItem('auth-token', res.token);
      console.log(res.data);
      set(
        produce((store: StoreState) => {
          store.auth.doctor.data = res.data;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.register.name,
        message,
      });
    }
  },
  async update(doctorId, data) {
    try {
      get().removeError(this.register.name);

      const res = await updateDoctor(doctorId, data);
      set(
        produce((store: StoreState) => {
          store.auth.doctor.data = res.data;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.register.name,
        message,
      });
    }
  },
});
