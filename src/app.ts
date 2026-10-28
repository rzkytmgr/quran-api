import cors from 'cors';
import express from 'express';
import { apiRouter } from './api/routes';
import { appConfig } from './config/app-config';
import { logging } from './core/middleware/logging';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

app.use(logging);
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.status(200).send(appConfig.message.pageWelcome);
});

app.use((req, res) => {
  res.status(404).send(appConfig.message.pageNotFound);
});

export default app;
