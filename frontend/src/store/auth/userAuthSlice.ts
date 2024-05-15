import { StateCreator } from 'zustand';
import { StoreState, UserAuth } from '../types';
import { loginUser, registerUser, updateUser } from '@/api/auth';
import { handleError } from '@/utils/errorHandler';
import { produce } from 'immer';

export const userAuthSlice: StateCreator<StoreState, [], [], UserAuth> = (
  set,
  get
) => ({
  loading: false,
  isPending: false,
  data: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    age: 0,
    sex: 1,
    userType: 'patient',
    createdAt: '',
  },
  async login(data) {
    try {
      get().removeError(this.login.name);

      set(
        produce((store: StoreState) => {
          store.auth.user.isPending = true;
        })
      );

      const res = await loginUser(data);

      localStorage.setItem('auth-token', res.token);

      set(
        produce((store: StoreState) => {
          store.auth.user.data = res.data;
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
          store.auth.user.isPending = false;
        })
      );
    }
  },
  async register(data) {
    try {
      get().removeError(this.register.name);

      const res = await registerUser(data);
      localStorage.setItem('auth-token', res.token);
      console.log(res.data);
      set(
        produce((store: StoreState) => {
          store.auth.user.data = res.data;
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
  async update(data) {
    get().removeError(this.register.name);

    set(
      produce((store: StoreState) => {
        store.auth.user.isPending = true;
      })
    );

    try {
      const res = await updateUser(data);
      set(
        produce((store: StoreState) => {
          store.auth.user.data = res.data;
        })
      );
    } catch (err) {
      const message = handleError(err as Error);
      get().addError({
        callingFunction: this.register.name,
        message,
      });
    } finally {
      set(
        produce((store: StoreState) => {
          store.auth.user.isPending = false;
        })
      );
    }
  },
  async getCurrentDoctor() {},
});
