import { StateCreator } from 'zustand';
import { RequestErrorState, StoreState } from './types';

export const createErrorSlice: StateCreator<
  StoreState,
  [],
  [],
  RequestErrorState
> = (set, get) => ({
  errors: [],
  addError: (error) =>
    set((store) => ({
      errors: [...store.errors, error],
    })),
  removeError: (callingFunction) =>
    set((store) => {
      const clonedStore = { ...store };

      const remainingErrors = clonedStore.errors.filter(
        (e) => e.callingFunction !== callingFunction
      );

      clonedStore.errors = remainingErrors;

      return clonedStore;
    }),
  getError: (callingFunction) => {
    const errors = get().errors;
    const [error] = errors.filter(
      (err) => err.callingFunction === callingFunction
    );
    return error || null;
  },
});
