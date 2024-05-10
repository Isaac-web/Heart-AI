import { StateCreator } from 'zustand';

import { AppDataSlice, StoreState } from './types';
import { appointmentSlice } from './entities/appointmentsSlice';
import { appointmentDetailSlice } from './details/appointment';
import { medicalReportSlice } from './entities/medicalReportSlice';
import { chatSessionsSlice } from './entities/chatSessionsSlice';

export const createDataSlice: StateCreator<StoreState, [], [], AppDataSlice> = (
  ...a
) => ({
  entities: {
    appointments: appointmentSlice(...a),
    medicalReports: medicalReportSlice(...a),
    chatSessions: chatSessionsSlice(...a),
  },
  details: {
    appointment: appointmentDetailSlice(...a),
  },
});
