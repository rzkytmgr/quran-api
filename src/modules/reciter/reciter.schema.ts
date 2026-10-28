import { z, ZodSchema } from 'zod';
import type { IValidateOptions } from '@core/middleware/validate';

const reciterPathSchema: IValidateOptions = {
  location: 'params',
  schema: z.object({
    reciter: z.coerce.number().int().positive(),
  }),
};

export { reciterPathSchema };
