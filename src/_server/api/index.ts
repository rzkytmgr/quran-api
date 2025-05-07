import { Wrapper } from '@util/wrapper';
import { caching } from '@middleware/caching';
import { router as v1 } from '@server/api/v1';
import { ErrorHandler } from '@lib/errors/_errors';
import {
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
const router = Router();

router.use(caching as () => void);

const routes = [v1];
for (const route of routes) {
  router.use(route);
}

router.use(Wrapper((req: Request, res: Response, next: NextFunction) => {
  throw new ErrorHandler({
    code: 404,
    message: 'Not Found',
    details: [],
  });
}));

router.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.code || 500).json({
    success: false,
    message: error.message,
    error: {
      details: error.details,
    },
    data: null,
  });
});

export { router };
