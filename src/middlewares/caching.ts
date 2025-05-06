import {
  NextFunction,
  Request,
  Response,
} from 'express';

const cached = new Map();
const caching = (req: Request, res: Response, next: NextFunction) => {
  const cachedResponse = cached.get(req.originalUrl || req.url);
  console.log(req.ext.constants.NOT_CACHED_PATH.includes(req.originalUrl));
  if (cachedResponse && cachedResponse.ttl > Date.now()) {
    return res.status(cachedResponse.status).json(JSON.parse(cachedResponse.body));
  } else {
    const expressBody = res.send.bind(res);
    res.send = (body): Response => {
      if (!req.ext.constants.NOT_CACHED_PATH.includes(req.originalUrl)) {
        cached.set(req.originalUrl || req.url, {
          body,
          status: res.statusCode,
          ttl: Date.now() + (24 * 60 * 60 * 1000),
        });
      }
      return expressBody(body);
    };
  }
  return next();
};

export { caching };
