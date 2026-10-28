import { NextFunction, Request, Response } from 'express';

const wrapper = (handler: (req: Request, res: Response, next: NextFunction) => unknown) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handler(req, res, next)).catch((error) => next(error));
};

export { wrapper };
