import type { ZodIssue, ZodSchema } from 'zod';
import { ApplicationError } from '../errors/application-error';
import { wrapper } from '../http/wrapper';
import { NextFunction, Request, Response } from 'express';

type IParameterLocation = 'query' | 'params' | 'body';

interface IValidateOptions {
  location: IParameterLocation;
  schema: ZodSchema;
}

const validateLocation = (req: Request, { location, schema }: IValidateOptions) => {
  if (location === 'body') {
    req.body = schema.parse(req.body);
    return;
  }
  if (location === 'query') {
    req.query = schema.parse(req.query) as typeof req.query;
    return;
  }
  req.params = schema.parse(req.params) as typeof req.params;
};

const validate = (options: IValidateOptions | IValidateOptions[]) =>
  wrapper((req: Request, res: Response, next: NextFunction) => {
    try {
      for (const option of Array.isArray(options) ? options : [options]) {
        validateLocation(req, option);
      }
    } catch (error) {
      const issues = (error as { issues: ZodIssue[] }).issues;
      throw new ApplicationError({
        code: 400,
        details: issues.map((issue) => ({ path: issue.path as Array<string | number>, message: issue.message })),
        message: 'BAD_REQUEST',
      });
    }
    return next();
  });

export { validate };
export type { IValidateOptions, IParameterLocation };
