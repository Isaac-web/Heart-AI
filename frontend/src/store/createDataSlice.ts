import { StateCreator } from 'zustand';

import { AppDataSlice, StoreState } from './types';
import { nameSlice } from './entities/names';

export const createDataSlice: StateCreator<StoreState, [], [], AppDataSlice> = (
  ...a
) => ({
  entities: {
    names: nameSlice(...a),
  },
});
