import { appConfig } from '@config/app-config';
import { Request, Response } from 'express';
import { getSpecificAyahService } from './ayah.service';
import type { IServiceQuery } from '../common/general-query.schema';

const getSpecificAyahController = async (req: Request, res: Response) => {
  const ayah = await getSpecificAyahService(req.params.ayah as unknown as number, req.query as IServiceQuery);

  return res.status(200).json({
    success: true,
    message: appConfig.message.dataRetrieved,
    data: ayah,
  });
};

const getRandomAyahController = async (req: Request, res: Response) => {
  const randomAyahSequence = Math.floor(Math.random() * appConfig.totalAyah) + 1;
  const ayah = await getSpecificAyahService(randomAyahSequence, req.query as IServiceQuery);

  return res.status(200).json({
    success: true,
    message: appConfig.message.dataRetrieved,
    data: ayah,
  });
};

export { getRandomAyahController, getSpecificAyahController };
