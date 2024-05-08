import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { NamesEntity, StoreState } from '../types';

export const nameSlice: StateCreator<StoreState, [], [], NamesEntity> = (
  set
) => ({
  loading: false,
  isPending: false,
  skip: 0,
  limit: 0,
  total: 0,
  data: ['Isaac', 'Joe', 'Abigail', 'Ruth', 'Israel'],
  addData(name) {
    set(
      produce((store) => {
        store.entities.names.data.push(name);
      })
    );
  },
});
