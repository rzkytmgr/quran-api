import {
  NextFunction,
  Request,
  Response,
} from 'express';

/** This function as wrapper function for async express middleware */
const Wrapper = (fn: (req: Request, res: Response, next: NextFunction) => unknown) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export { Wrapper };
