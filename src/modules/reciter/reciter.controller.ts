import { ApplicationError } from '@core/errors/application-error';
import { Request, Response } from 'express';
import { findReciterById, getAllReciters } from './reciter.service';

const getAllRecitersController = async (req: Request, res: Response) => {
  const reciters = getAllReciters();

  return res.status(200).json({
    success: true,
    message: 'Reciters retrieved successfully',
    data: reciters.map(({ id, name }) => ({ id, name })),
  });
};

const getReciterByIdController = async (req: Request, res: Response) => {
  const reciter = findReciterById(req.params.reciter as unknown as number);

  if (!reciter) {
    throw new ApplicationError({
      code: 404,
      details: [
        {
          path: ['reciter'],
          message: `We cannot find reciter '${req.params.reciter}'.`,
        },
      ],
      message: 'NOT_FOUND',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Reciter retrieved successfully',
    data: {
      id: reciter.id,
      name: reciter.name,
    },
  });
};

export { getAllRecitersController, getReciterByIdController };
