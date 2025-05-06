/* eslint-disable @typescript-eslint/no-explicit-any */
import { EValidatorType } from '@enum/_enum';
import { IValidatorOptions } from '@interface/_interfaces';
import { ErrorHandler } from '@lib/errors/_errors';
import { Wrapper } from '@util/wrapper';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

const validator = (options: IValidatorOptions | IValidatorOptions[]) =>
  Wrapper((req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = (schema: IValidatorOptions) => {
        switch (schema.type) {
          case EValidatorType.QueryParameter:
            req.query = schema.schema.parse(req.query);
            break;
          case EValidatorType.PathParameter:
            req.params = schema.schema.parse(req.params);
            break;
          case EValidatorType.RequestBody:
            req.body = schema.schema.parse(req.body);
            break;
        }
      };

      if (Array.isArray(options)) {
        for (const schema of options) {
          validate(schema);
        }
      } else {
        validate(options);
      }
    } catch (error: any) {
      throw new ErrorHandler({
        code: 400,
        details: error.issues as [],
        message: 'BAD_REQUEST',
      });
    }

    return next();
  });

export { validator };
