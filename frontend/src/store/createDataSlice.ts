import { StateCreator } from 'zustand';

import { AppDataSlice, StoreState } from './types';
import { appointmentSlice } from './entities/appointmentsSlice';
import { appointmentDetailSlice } from './details/appointment';
import { medicalReportSlice } from './entities/medicalReportSlice';
import { chatSessionsSlice } from './entities/chatSessionsSlice';
import { chatMessagesSlice } from './entities/chatMessagesSlice';

export const createDataSlice: StateCreator<StoreState, [], [], AppDataSlice> = (
  ...a
) => ({
  entities: {
    appointments: appointmentSlice(...a),
    medicalReports: medicalReportSlice(...a),
    chatSessions: chatSessionsSlice(...a),
    chatMessages: chatMessagesSlice(...a),
  },
  details: {
    appointment: appointmentDetailSlice(...a),
  },
});
