import { jsonResolver } from '@util/_utils';
import { IRawReciters } from 'src/interfaces/_interfaces';

const getEntireRecitersService = async () => {
  const getReciters = await jsonResolver<IRawReciters[]>('EntireReciters');
  return getReciters;
};

const getSpesificReciterService = async (reciterId: number) => {
  const getReciters = await getEntireRecitersService();
  const getOneReciter = (new Map(getReciters.map((reciter) => [reciter.id, reciter]))).get(reciterId);
  return getOneReciter;
};

export {
  getEntireRecitersService,
  getSpesificReciterService,
};
