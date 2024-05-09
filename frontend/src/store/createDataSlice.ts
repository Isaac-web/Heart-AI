import { StateCreator } from 'zustand';

import { AppDataSlice, StoreState } from './types';
import { appointmentSlice } from './entities/appointmentsSlice';
import { appointmentDetailSlice } from './details/appointment';

export const createDataSlice: StateCreator<StoreState, [], [], AppDataSlice> = (
  ...a
) => ({
  entities: {
    appointments: appointmentSlice(...a),
  },
  details: {
    appointment: appointmentDetailSlice(...a),
  },
});
