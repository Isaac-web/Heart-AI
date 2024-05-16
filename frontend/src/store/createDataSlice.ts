import { StateCreator } from 'zustand';

import { DataSlice, StoreState } from './types';
import { appointmentSlice } from './entities/appointmentsSlice';
import { appointmentDetailSlice } from './details/appointment';
import { medicalReportSlice } from './entities/medicalReportSlice';
import { chatSessionsSlice } from './entities/chatSessionsSlice';
import { chatMessagesSlice } from './entities/chatMessagesSlice';
import { medicalReportDetailSlice } from './details/medicalReport';

export const createDataSlice: StateCreator<StoreState, [], [], DataSlice> = (
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
    medicalReport: medicalReportDetailSlice(...a),
  },
});
