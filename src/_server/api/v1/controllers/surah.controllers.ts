import {
  getEntireSurahService,
  getSpesificSurahService,
} from '@service/surah.services';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { ErrorHandler } from '@lib/errors/_errors';

const getEntireSurahController = async (req: Request, res: Response, next: NextFunction) => {
  const getEntireSurah = await getEntireSurahService(
    req.query.lang as unknown as string,
    req.query.reciter as unknown as number,
  );

  return res.status(200).json({
    success: true,
    message: req.ext.constants.MESSAGE_DATA_RETRIEVED,
    data: getEntireSurah,
  });
};

const getSpesificSurahController = async (req: Request, res: Response, next: NextFunction) => {
  const getSpesificSurah = await getSpesificSurahService(
    req.params.surah as unknown as number,
    req.query.lang as unknown as string,
    req.query.reciter as unknown as number,
  );

  if (!getSpesificSurah) {
    throw new ErrorHandler({
      code: 404,
      details: [{
        path: ['surah'],
        message: `We cannot find surah sequence '${req.params.surah}'.`,
      }],
      message: 'NOT_FOUND',
    });
  }

  return res.status(200).json({
    success: true,
    message: req.ext.constants.MESSAGE_DATA_RETRIEVED,
    data: getSpesificSurah,
  });
};

const getSpesificSurahAyahController = async (req: Request, res: Response, next: NextFunction) => {
  const getSpesificSurah = await getSpesificSurahService(
    req.params.surah as unknown as number,
    req.query.lang as unknown as string,
    req.query.reciter as unknown as number,
  );

  if (!getSpesificSurah) {
    throw new ErrorHandler({
      code: 404,
      details: [{
        path: ['surah'],
        message: `We cannot find surah sequence '${req.params.surah}'.`,
      }],
      message: 'NOT_FOUND',
    });
  }

  const getSpesificAyahSurah = new Map(getSpesificSurah.ayah.map((ayah) => [ayah.sequence.surah, ayah])).get(req.params.ayah as unknown as number);

  if (!getSpesificAyahSurah) {
    throw new ErrorHandler({
      code: 404,
      details: [{
        path: ['ayah'],
        message: `We cannot find ayah sequence '${req.params.ayah}' in surah '${req.params.surah}'.`,
      }],
      message: 'NOT_FOUND',
    });
  }

  const surahFormatted = {
    ...getSpesificSurah,
    ayah: getSpesificAyahSurah,
  };

  return res.status(200).json({
    success: true,
    message: req.ext.constants.MESSAGE_DATA_RETRIEVED,
    data: surahFormatted,
  });
};

export {
  getEntireSurahController,
  getSpesificSurahAyahController,
  getSpesificSurahController,
};
