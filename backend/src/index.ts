import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import debug from 'debug';
import config from 'config';
import cors from 'cors';

import users from './routes/users.routes';
import medicalReports from './routes/medical-reports.routes';
import chatSessions from './routes/chat-session.routes';
import chatMessages from './routes/chatMessage.routes';
import predictions from './routes/predictions.routes';
import medicalReportRequest from './routes/medicalReportRequest.routes';

const logDb = debug('db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Here we go!' });
});

app.use('/api/users/', users);
app.use('/api/chat-messages', chatMessages);
app.use('/api/medical-reports/requests', medicalReportRequest);
app.use('/api/medical-reports/', medicalReports);
app.use('/api/chat-sessions/', chatSessions);
app.use('/api/predictions/', predictions);

const port = config.get('port');
const dbUrl = config.get('db.url');
mongoose
  .connect(config.get('db.url'))
  .then(() => {
    logDb(`Connected to ${dbUrl}`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error('Something went wrong while connecting to mongodb.', err);
  });
