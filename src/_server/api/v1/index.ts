import { router as routes } from '@server/api/v1/_routes';
import { Router } from 'express';
const router = Router();

router.use('/v1', routes);

export { router };
