import { aggregator, jsonResolver, padNumber } from '@util/_utils';
import { constants } from '@util/constants/_constants';
import { IPreBismillah, IQuranSurah, IRawQuranSurah, IRawQuranSurahTranslation, IServiceQuery } from 'src/interfaces/_interfaces';
import { getSpesificSurahAyahService } from './ayah.services';
import { getSpesificReciterService } from './reciter.services';

/** @helper to generate recitation audio for a surah */
const generateSurahRecitationAudio = (recitationDir: string, surahNumber: number): string => {
  const paddedNumber = padNumber(surahNumber, 3);
  return `${constants.SERVICE_URL.QURANICAUDIO}${recitationDir}${paddedNumber}.mp3`;
};

/** @helper to check a surah has preBismillah or not */
const shouldIncludePreBismillah = (surahSequence: number): boolean => surahSequence !== 9;

/** @service get entire surah service full inclduing the recitation audio url */
const getEntireSurahService = async (query: IServiceQuery) => {
  const { lang, reciter } = query;

  const [rawSurah, rawSurahTranslation, preBismillah, spesificReciter] = await Promise.all([
    jsonResolver<IRawQuranSurah[]>('EntireQuranSurah'),
    jsonResolver<IRawQuranSurahTranslation[]>(['_translation', 'lang', lang!, 'EntireQuranSurahTranslation']),
    jsonResolver<IPreBismillah>(['_translation', 'lang', lang!, 'PreBismillah']),
    getSpesificReciterService(reciter!),
  ]);

  const aggregatedSurah = aggregator<IQuranSurah[]>(rawSurah, rawSurahTranslation);
  return aggregatedSurah.map((surah) => ({
    ...surah,
    preBismillah: shouldIncludePreBismillah(surah.sequence) ? preBismillah : false,
    recitation: { audio: generateSurahRecitationAudio(spesificReciter!.folder.surah, surah.sequence) },
  }));
};

/** @service get spesific surah service including the recitation audio url */
const getSpesificSurahService = async (surahSequence: number, query: IServiceQuery) => {
  const entireSurah = await getEntireSurahService(query);
  const selectedSurah = entireSurah.find((surah) => surah.sequence === surahSequence) as IQuranSurah;

  const spesificSurahAyahs = await getSpesificSurahAyahService(surahSequence, query);

  return {
    ...selectedSurah,
    ayah: spesificSurahAyahs,
  };
};

export { getEntireSurahService, getSpesificSurahService };
