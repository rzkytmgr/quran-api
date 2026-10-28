import { ApplicationError } from '@core/errors/application-error';
import { Request, Response } from 'express';
import { appConfig } from '@config/app-config';
import { getEntireSurahService, getSpecificSurahService } from './surah.service';
import type { IServiceQuery } from '../common/general-query.schema';

const getEntireSurahController = async (req: Request, res: Response) => {
  const surahs = await getEntireSurahService(req.query as IServiceQuery);

  return res.status(200).json({
    success: true,
    message: appConfig.message.dataRetrieved,
    data: surahs,
  });
};

const getSpecificSurahController = async (req: Request, res: Response) => {
  const surah = await getSpecificSurahService(req.params.surah as unknown as number, req.query as IServiceQuery);

  if (!surah) {
    throw new ApplicationError({
      code: 404,
      details: [
        {
          path: ['surah'],
          message: `We cannot find surah sequence '${req.params.surah}'.`,
        },
      ],
      message: 'NOT_FOUND',
    });
  }

  return res.status(200).json({
    success: true,
    message: appConfig.message.dataRetrieved,
    data: surah,
  });
};

const getSpecificSurahAyahController = async (req: Request, res: Response) => {
  const surah = await getSpecificSurahService(req.params.surah as unknown as number, req.query as IServiceQuery);

  if (!surah) {
    throw new ApplicationError({
      code: 404,
      details: [
        {
          path: ['surah'],
          message: `We cannot find surah sequence '${req.params.surah}'.`,
        },
      ],
      message: 'NOT_FOUND',
    });
  }

  const ayah = (surah.ayah as Array<Record<string, unknown>>).find((item) => item.sequence && (item.sequence as Record<string, unknown>).surah === Number(req.params.ayah));

  if (!ayah) {
    throw new ApplicationError({
      code: 404,
      details: [
        {
          path: ['ayah'],
          message: `We cannot find ayah sequence '${req.params.ayah}' in surah '${req.params.surah}'.`,
        },
      ],
      message: 'NOT_FOUND',
    });
  }

  return res.status(200).json({
    success: true,
    message: appConfig.message.dataRetrieved,
    data: {
      ...surah,
      ayah,
    },
  });
};

export { getEntireSurahController, getSpecificSurahController, getSpecificSurahAyahController };
