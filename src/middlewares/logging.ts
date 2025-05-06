import { logger } from '@lib/logger/_logger';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

const logging = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', () => {
    logger.info(JSON.stringify({
      ip: req.ip,
      method: req.method,
      status: res.statusCode,
      path: req.originalUrl,
      userAgent: req.get('User-Agent'),
      latency: Date.now() - startTime + 'ms',
    }));
  });
  return next();
};

export { logging };
