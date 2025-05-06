import {
  getEntireAyahService,
  getSpesificAyahService,
  getSpesificSurahAyahService,
} from '@service/ayah.services';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

const getSpesificAyahController = async (req: Request, res: Response, next: NextFunction) => {
  const getSpesificAyah = await getSpesificAyahService(
    req.params.ayah as unknown as number,
    req.query.lang as unknown as string,
    req.query.reciter as unknown as number,
  );

  return res.status(200).json({
    success: true,
    message: req.ext.constants.MESSAGE_DATA_RETRIEVED,
    data: getSpesificAyah,
  });
};

const getRandomAyahController = async (req: Request, res: Response, next: NextFunction) => {
  const randomAyahSequence = Math.floor(Math.random() * 6236) + 1;

  const getSpesificAyah = await getSpesificAyahService(
    randomAyahSequence,
    req.query.lang as unknown as string,
    req.query.reciter as unknown as number,
  );

  return res.status(200).json({
    success: true,
    message: req.ext.constants.MESSAGE_DATA_RETRIEVED,
    data: getSpesificAyah,
  });
};

export {
  getRandomAyahController,
  getSpesificAyahController,
};
