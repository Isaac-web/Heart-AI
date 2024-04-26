import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import debug from 'debug';
import config from 'config';

const app = express();
const logDb = debug('db');

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Here we go!' });
});

const port = config.get('port');

mongoose
  .connect(config.get('db.url'))
  .then(() => {
    logDb(`Connected to ${config.get('db.url')}`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error('Something went wrong while connecting to mongodb.', err);
  });
