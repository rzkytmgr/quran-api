import { z } from 'zod';
import { appConfig } from '@config/app-config';
import type { IValidateOptions } from '@core/middleware/validate';

const quranAyahPathSchema: IValidateOptions = {
  location: 'params',
  schema: z.object({
    ayah: z.coerce
      .number()
      .int()
      .positive()
      .refine((value) => appConfig.totalAyah >= value, { error: (issue) => `We cannot find quran ayah sequence '${issue.input}'` }),
  }),
};

export { quranAyahPathSchema };
