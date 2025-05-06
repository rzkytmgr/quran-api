import { ErrorHandler } from '@lib/errors/_errors';
import {
  getEntireRecitersService,
  getSpesificReciterService,
} from '@service/reciter.services';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

const getEntireRecitersController = async (req: Request, res: Response, next: NextFunction) => {
  const getEntireReciters = await getEntireRecitersService();
  return res.status(200).json({
    success: true,
    message: 'Reciters retrieved successfully',
    data: getEntireReciters.map(({ id, name }) => ({ id, name })),
  });
};

const getSpesificReciterController = async (req: Request, res: Response, next: NextFunction) => {
  const getSpesificReciter = await getSpesificReciterService(req.params.reciter as unknown as number);

  if (!getSpesificReciter) {
    throw new ErrorHandler({
      code: 404,
      details: [{
        path: ['reciter'],
        message: `We cannot find reciter '${req.params.reciter}'.`,
      }],
      message: 'NOT_FOUND',
    });
  }

  const formatReciter = {
    id: getSpesificReciter.id,
    name: getSpesificReciter.name,
  };

  return res.status(200).json({
    success: true,
    message: 'Reciter retrieved successfully',
    data: formatReciter,
  });
};

export {
  getEntireRecitersController,
  getSpesificReciterController,
};
