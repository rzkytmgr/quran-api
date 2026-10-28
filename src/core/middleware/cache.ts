import { appConfig } from '@config/app-config';
import { NextFunction, Request, Response } from 'express';

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const cachedResponses = new Map<string, { body: string; status: number; ttl: number }>();

const cache = (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl || req.url;
  const cachedResponse = cachedResponses.get(url);

  if (cachedResponse && cachedResponse.ttl > Date.now()) {
    return res.status(cachedResponse.status).json(JSON.parse(cachedResponse.body));
  }

  const originalSend = res.send.bind(res);
  res.send = (body): Response => {
    if (!(appConfig.notCachedPaths as readonly string[]).includes(req.path)) {
      cachedResponses.set(url, {
        body: body as string,
        status: res.statusCode,
        ttl: Date.now() + CACHE_TTL_MS,
      });
    }
    return originalSend(body);
  };

  return next();
};

export { cache };
