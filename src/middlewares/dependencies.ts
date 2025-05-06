import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { logger } from '@lib/logger/_logger';
import { constants } from '@util/constants/_constants';
import { getEntireRecitersService } from '@service/reciter.services';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

const dependencies = async (req: Request, response: Response, next: NextFunction) => {
  if (!constants.META_AVAILABLE_LANGUAGE.length) {
    constants.META_AVAILABLE_LANGUAGE = fs.readdirSync(path.resolve('src', 'db', '_translation', 'lang'));
  }

  if (!constants.META_RECITER_LIST.length) {
    const getEntireReciters = await getEntireRecitersService();
    constants.META_RECITER_LIST = getEntireReciters.map((value) => value.id);
  }

  const dependenciesExtra = {
    logger,
    constants,
    validator: z,
  };

  req.ext = dependenciesExtra;
  next();
};

export { dependencies };
