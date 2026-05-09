import { jsonResolver } from '@util/_utils';
import { IRawReciters } from 'src/interfaces/_interfaces';

const getEntireRecitersService = async () => {
  return await jsonResolver<IRawReciters[]>('EntireReciters');
};

const getSpesificReciterService = async (reciterId: number) => {
  const reciters = await getEntireRecitersService();
  const spesificReciter = new Map(reciters.map((reciter) => [reciter.id, reciter]));
  return spesificReciter.get(reciterId);
};

export { getEntireRecitersService, getSpesificReciterService };
