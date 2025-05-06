import {
  IQuranAyah,
  IRawQuranAyah,
  IRawQuranAyahTranslation,
} from '@interface/_interfaces';
import {
  aggregator,
  jsonResolver,
  padNumber,
} from '@util/_utils';
import { constants } from '@util/constants/_constants';
import { getSpesificReciterService } from './reciter.services';

const getEntireAyahService = async () => {
  const getQuranEntireAyah = await jsonResolver<{ surah: number; ayah: IRawQuranAyah[]; }[]>('EntireQuranAyah');
  return getQuranEntireAyah;
};

const getEntireFlatAyahService = async () => {
  const getQuranEntireAyah = await getEntireAyahService();

  const flattingAyah = (item: { surah: number; ayah: IRawQuranAyah[]; }) =>
    item.ayah.map((value) => ({
      ...value,
      surah: item.surah,
    }));

  return new Map(getQuranEntireAyah.flatMap(flattingAyah).map((item) => [item.sequence.quran, item]));
};

const getEntireFlatAyahTranslationService = async (lang: string) => {
  const getQuranEntireAyahTranslation = await jsonResolver<{ surah: number; ayah: IRawQuranAyahTranslation[]; }[]>(['_translation', 'lang', lang, 'EntireQuranAyahTranslation']);

  const flattingAyah = (item: { surah: number; ayah: IRawQuranAyahTranslation[]; }) =>
    item.ayah.map((value) => ({
      ...value,
      surah: item.surah,
    }));

  return new Map(getQuranEntireAyahTranslation.flatMap(flattingAyah).map((item) => [item.sequence.quran, item]));
};

const getSpesificAyahService = async (ayahSequence: number, lang: string, reciter: number) => {
  const getQuranEntireAyah = await getEntireFlatAyahService();
  const getQuranEntireAyahTranslation = await getEntireFlatAyahTranslationService(lang);
  const getSpesificReciter = await getSpesificReciterService(reciter);

  const getSpesificQuranSurahAyah = getQuranEntireAyah.get(ayahSequence) as IRawQuranAyah;
  const getSpesificQuranSurahAyahTranslation = getQuranEntireAyahTranslation.get(ayahSequence) as IRawQuranAyahTranslation;

  const formattedAyah = aggregator<{ surah: number; } & IQuranAyah>(getSpesificQuranSurahAyah, getSpesificQuranSurahAyahTranslation);
  formattedAyah.recitation = {
    audio: `${constants.SERVICE_URL.EVERYAYAH}${getSpesificReciter?.folder.ayah}${padNumber(formattedAyah.surah, 3)}${padNumber(formattedAyah.sequence.surah, 3)}.mp3`,
  };

  return formattedAyah;
};

const getSpesificSurahAyahService = async (surahSequence: number, lang: string, reciter: number) => {
  const getQuranEntireAyah = await getEntireAyahService();
  const getQuranEntireAyahTranslation = await jsonResolver<{ surah: number; ayah: IRawQuranAyahTranslation[]; }[]>(['_translation', 'lang', lang, 'EntireQuranAyahTranslation']);
  const getSpesificReciter = await getSpesificReciterService(reciter);

  const getSpesificQuranSurahAyah = new Map(getQuranEntireAyah.map((ayah) => [ayah.surah, ayah.ayah])).get(surahSequence) as IRawQuranAyah[];
  const getSpesificQuranSurahAyahTranslation = new Map(getQuranEntireAyahTranslation.map((translation) => [translation.surah, translation.ayah])).get(
    surahSequence,
  ) as IRawQuranAyahTranslation[];

  const formattedAyah: IQuranAyah[] = aggregator<IQuranAyah[]>(getSpesificQuranSurahAyah, getSpesificQuranSurahAyahTranslation).map((value) => ({
    ...value,
    recitation: {
      audio: `${constants.SERVICE_URL.EVERYAYAH}${getSpesificReciter?.folder.ayah}${padNumber(surahSequence, 3)}${padNumber(value.sequence.surah, 3)}.mp3`,
    },
  }));

  return formattedAyah;
};

export {
  getEntireAyahService,
  getSpesificAyahService,
  getSpesificSurahAyahService,
};
