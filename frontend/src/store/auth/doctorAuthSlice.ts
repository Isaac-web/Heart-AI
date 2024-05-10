import { StateCreator } from 'zustand';
import { DoctorAuth, StoreState } from '../types';
import {
  getCurrentDoctor,
  loginDoctor,
  registerDoctor,
  updateDoctor,
} from '@/api/auth';
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
  async login(data) {
    try {
      get().removeError(this.login.name);

      set(
        produce((store: StoreState) => {
          store.auth.doctor.isPending = true;
        })
      );

      const res = await loginDoctor(data);

      localStorage.setItem('auth-token', res.token);

      set(
        produce((store: StoreState) => {
          store.auth.doctor.data = res.data;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.login.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.auth.doctor.isPending = false;
        })
      );
    }
  },
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
  async getCurrentDoctor() {
    try {
      get().removeError(this.getCurrentDoctor.name);

      set(
        produce((store: StoreState) => {
          store.auth.doctor.loading = true;
        })
      );

      const currentDoctor = await getCurrentDoctor();

      set(
        produce((store: StoreState) => {
          store.auth.doctor.data = currentDoctor;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.getCurrentDoctor.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.auth.doctor.loading = false;
        })
      );
    }
  },
});
