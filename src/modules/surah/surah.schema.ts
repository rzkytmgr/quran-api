import { z } from 'zod';
import type { IValidateOptions } from '@core/middleware/validate';

const surahPathSchema: IValidateOptions = {
  location: 'params',
  schema: z.object({
    surah: z.coerce.number().int().positive(),
  }),
};

const surahAyahPathSchema: IValidateOptions = {
  location: 'params',
  schema: z.object({
    surah: z.coerce.number().int().positive(),
    ayah: z.coerce.number().int().positive(),
  }),
};

export { surahAyahPathSchema, surahPathSchema };
