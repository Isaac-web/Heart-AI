import express, { Request, Response } from 'express';
import config from 'config';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Here we go!' });
});

const port = config.get('port');

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
