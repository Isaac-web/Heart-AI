import { Express } from 'express';

import users from '../routes/users.routes';
import medicalReports from '../routes/medical-reports.routes';
import chatSessions from '../routes/chat-session.routes';
import chatMessages from '../routes/chatMessage.routes';
import medicalReportRequest from '../routes/medicalReportRequest.routes';
import rootRoute from '../routes/root.routes';
import doctors from '../routes/doctors.routes';
import analytics from '../routes/analytics.routes';

export const configureRoutes = (app: Express) => {
  app.use('/api/users/', users);
  app.use('/api/doctors/', doctors);
  app.use('/api/chat-messages', chatMessages);
  app.use('/api/medical-reports/requests', medicalReportRequest);
  app.use('/api/medical-reports/', medicalReports);
  app.use('/api/chat-sessions/', chatSessions);
  app.use('/api/analytics/', analytics);
  app.use('/', rootRoute);
};
