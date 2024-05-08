import config from 'config';
import { Express } from 'express';
import mongoose from 'mongoose';
import debug from 'debug';
const logDb = debug('db');

const port = config.get('port');
const dbUrl = config.get('db.url');
export const handleConnection = (app: Express) => {
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
};
