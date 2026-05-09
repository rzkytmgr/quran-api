import { IQuranAyah, IRawQuranAyah, IRawQuranAyahTranslation, IServiceQuery } from '@interface/_interfaces';
import { aggregator, jsonResolver, padNumber } from '@util/_utils';
import { constants } from '@util/constants/_constants';
import { getSpesificReciterService } from './reciter.services';

/** @helper ayah flatten helper function */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flattenAyahData = <T extends { surah: number; ayah: any[]; }>(data: T[]) => {
  return data.flatMap(({ surah, ayah }) => ayah.map((item) => ({ ...item, surah })));
};

/** @helper map ayah to sequential */
const sequenceMap = <T extends { sequence: { quran: number; }; }>(ayahs: T[]) => {
  return new Map(ayahs.map((item) => [item.sequence.quran, item]));
};

/** @helper to generate url for recitation audio */
const generateAyahRecitationAudio = (baseUrl: string, folderPath: string, surah: number, ayah: number): string => {
  return `${baseUrl}${folderPath}${padNumber(surah, 3)}${padNumber(ayah, 3)}.mp3`;
};

/** @service to fetch entire ayah in quran */
const getEntireAyahService = async () => {
  return await jsonResolver<{ surah: number; ayah: IRawQuranAyah[]; }[]>('EntireQuranAyah');
};

/** @service to fetch flatten ayah */
const getEntireFlatAyahService = async () => {
  const rawAyah = await getEntireAyahService();
  const flattenAyah = flattenAyahData(rawAyah);
  return sequenceMap(flattenAyah);
};

/** @service to fetch flatten ayah translation */
const getEntireFlatAyahTranslationService = async (query: IServiceQuery) => {
  const { lang } = query;
  const ayahTranslation = await jsonResolver<{ surah: number; ayah: IRawQuranAyahTranslation[]; }[]>(
    ['_translation', 'lang', lang!, 'EntireQuranAyahTranslation'],
  );

  const flattenTranslation = flattenAyahData(ayahTranslation);
  return sequenceMap(flattenTranslation);
};

/** @service to fetch spesific ayah */
const getSpesificAyahService = async (ayahSequence: number, query: IServiceQuery) => {
  const { lang, reciter } = query;
  const [entireAyah, entireTranslation, spesificReciter] = await Promise.all([
    getEntireFlatAyahService(),
    getEntireFlatAyahTranslationService(query),
    getSpesificReciterService(reciter!),
  ]);

  const rawAyah = entireAyah.get(ayahSequence);
  const rawTranslation = entireTranslation.get(ayahSequence);
  const aggregatedAyah = aggregator<{ surah: number; } & IQuranAyah>(rawAyah, rawTranslation);
  aggregatedAyah.recitation = {
    audio: generateAyahRecitationAudio(
      constants.SERVICE_URL.EVERYAYAH,
      spesificReciter!.folder.ayah,
      aggregatedAyah.surah,
      aggregatedAyah.sequence.surah,
    ),
  };

  return aggregatedAyah;
};

/** @service to fetch spesific surah ayah */
const getSpesificSurahAyahService = async (surahSequence: number, query: IServiceQuery) => {
  const { lang, reciter } = query;
  const [entireAyah, entireTranslation, spesificReciter] = await Promise.all([
    getEntireAyahService(),
    jsonResolver<{ surah: number; ayah: IRawQuranAyahTranslation[]; }[]>(
      ['_translation', 'lang', lang!, 'EntireQuranAyahTranslation'],
    ),
    getSpesificReciterService(reciter!),
  ]);

  const surahAyah = entireAyah.find((item) => item.surah === surahSequence)?.ayah ?? [];
  const surahAyahTranslation = entireTranslation.find((item) => item.surah === surahSequence)?.ayah ?? [];

  const aggregatedAyah: IQuranAyah[] = aggregator<IQuranAyah[]>(surahAyah, surahAyahTranslation).map((ayah) => ({
    ...ayah,
    recitation: {
      audio: generateAyahRecitationAudio(
        constants.SERVICE_URL.EVERYAYAH,
        spesificReciter!.folder.ayah,
        surahSequence,
        ayah.sequence.surah,
      ),
    },
  }));

  return aggregatedAyah;
};

export { getEntireAyahService, getSpesificAyahService, getSpesificSurahAyahService };
