import { z } from 'zod';
import { appConfig } from '@config/app-config';
import { getAvailableLanguages } from '@dataset/language-catalog';
import { getReciterIds } from '@modules/reciter/reciter.service';
import type { IValidateOptions } from '@core/middleware/validate';

interface IServiceQuery {
  lang?: string;
  reciter?: number;
}

const generalQuerySchema: IValidateOptions = {
  location: 'query',
  schema: z.object({
    reciter: z.coerce
      .number()
      .int()
      .positive()
      .refine((value) => getReciterIds().includes(value), { error: (issue) => `We cannot find reciter with id '${issue.input}'` })
      .default(appConfig.defaultReciter),
    lang: z
      .string()
      .refine((value) => getAvailableLanguages().includes(value), { error: (issue) => `We cannot find language '${issue.input}'` })
      .default(appConfig.defaultLanguage),
  }),
};

export { generalQuerySchema };
export type { IServiceQuery };
