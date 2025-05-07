import { ErrorHandler } from '../../../../libraries/errors/_errors.js';
import {
  getEntireRecitersService,
  getSpesificReciterService,
} from '../../../../services/reciter.services.js';
const getEntireRecitersController = async (req, res, next) => {
  const getEntireReciters = await getEntireRecitersService();
  return res.status(200).json({
    success: true,
    message: 'Reciters retrieved successfully',
    data: getEntireReciters.map(({ id, name }) => ({ id, name })),
  });
};
const getSpesificReciterController = async (req, res, next) => {
  const getSpesificReciter = await getSpesificReciterService(req.params.reciter);
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
// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaXRlcnMuY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvX3NlcnZlci9hcGkvdjEvY29udHJvbGxlcnMvcmVjaXRlcnMuY29udHJvbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIseUJBQXlCLEdBQzFCLE1BQU0sMkJBQTJCLENBQUM7QUFPbkMsTUFBTSwyQkFBMkIsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDNUYsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHdCQUF3QixFQUFFLENBQUM7SUFDM0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxQixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxpQ0FBaUM7UUFDMUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUQsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSw0QkFBNEIsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDN0YsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBNEIsQ0FBQyxDQUFDO0lBRXBHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxZQUFZLENBQUM7WUFDckIsSUFBSSxFQUFFLEdBQUc7WUFDVCxPQUFPLEVBQUUsQ0FBQztvQkFDUixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ2pCLE9BQU8sRUFBRSwyQkFBMkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUk7aUJBQzNELENBQUM7WUFDRixPQUFPLEVBQUUsV0FBVztTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxhQUFhLEdBQUc7UUFDcEIsRUFBRSxFQUFFLGtCQUFrQixDQUFDLEVBQUU7UUFDekIsSUFBSSxFQUFFLGtCQUFrQixDQUFDLElBQUk7S0FDOUIsQ0FBQztJQUVGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUIsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsZ0NBQWdDO1FBQ3pDLElBQUksRUFBRSxhQUFhO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE9BQU8sRUFDTCwyQkFBMkIsRUFDM0IsNEJBQTRCLEdBQzdCLENBQUMifQ==
