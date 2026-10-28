import { Router, NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../core/errors/application-error';
import { cache } from '../core/middleware/cache';
import { wrapper } from '../core/http/wrapper';
import { getAllRecitersController, getReciterByIdController } from '../modules/reciter/reciter.controller';
import { reciterPathSchema } from '../modules/reciter/reciter.schema';
import { generalQuerySchema } from '../modules/common/general-query.schema';
import { getEntireSurahController, getSpecificSurahAyahController, getSpecificSurahController } from '../modules/surah/surah.controller';
import { surahAyahPathSchema, surahPathSchema } from '../modules/surah/surah.schema';
import { getRandomAyahController, getSpecificAyahController } from '../modules/ayah/ayah.controller';
import { quranAyahPathSchema } from '../modules/ayah/ayah.schema';
import { validate } from '../core/middleware/validate';

const apiRouter = Router();

apiRouter.use(cache);

apiRouter.get('/v1/reciters', wrapper(getAllRecitersController));
apiRouter.get('/v1/reciter/:reciter(\\d+)', validate([reciterPathSchema]), wrapper(getReciterByIdController));

apiRouter.get('/v1/surah', validate([generalQuerySchema]), wrapper(getEntireSurahController));
apiRouter.get('/v1/surah/:surah(\\d+)', validate([generalQuerySchema, surahPathSchema]), wrapper(getSpecificSurahController));
apiRouter.get('/v1/surah/:surah(\\d+)/ayah/:ayah(\\d+)', validate([generalQuerySchema, surahAyahPathSchema]), wrapper(getSpecificSurahAyahController));

apiRouter.get('/v1/ayah/:ayah(\\d+)', validate([generalQuerySchema, quranAyahPathSchema]), wrapper(getSpecificAyahController));
apiRouter.get('/v1/ayah/random', validate([generalQuerySchema]), wrapper(getRandomAyahController));

apiRouter.use(
  wrapper((req: Request, res: Response, next: NextFunction) => {
    throw new ApplicationError({
      code: 404,
      message: 'Not Found',
      details: [],
    });
  }),
);

apiRouter.use((error: ApplicationError | Error, req: Request, res: Response, next: NextFunction) => {
  const applicationError = error instanceof ApplicationError ? error : undefined;
  res.status(applicationError?.code ?? 500).json({
    success: false,
    message: error.message,
    error: {
      details: applicationError?.details ?? [],
    },
    data: null,
  });
});

export { apiRouter };
