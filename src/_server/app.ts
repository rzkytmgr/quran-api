import { dependencies, logging } from '@middleware/_middlewares';
import { router as apiRoutes } from '@server/api';
import { constants } from '@util/constants/_constants';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

app.use(dependencies);
app.use(logging);
app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(constants.MESSAGE_PAGE_WELCOME);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send(constants.MESSAGE_PAGE_NOT_FOUND);
});

export default app;
