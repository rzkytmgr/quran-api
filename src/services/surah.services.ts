import {
  aggregator,
  jsonResolver,
  padNumber,
} from '@util/_utils';
import { constants } from '@util/constants/_constants';
import {
  IPreBismillah,
  IQuranSurah,
  IRawQuranSurah,
  IRawQuranSurahTranslation,
} from 'src/interfaces/_interfaces';
import { getSpesificSurahAyahService } from './ayah.services';
import { getSpesificReciterService } from './reciter.services';

const getEntireSurahService = async (lang: string, reciter: number) => {
  const getQuranEntireSurah = await jsonResolver<IRawQuranSurah[]>('EntireQuranSurah');
  const getQuranEntireSurahTranslation = await jsonResolver<IRawQuranSurahTranslation[]>(['_translation', 'lang', lang, 'EntireQuranSurahTranslation']);
  const getSurahPreBismillah = await jsonResolver<IPreBismillah>(['_translation', 'lang', lang, 'PreBismillah']);
  const getSpesificReciter = await getSpesificReciterService(reciter);

  const quranEntireSurah = aggregator<IQuranSurah[]>(getQuranEntireSurah, getQuranEntireSurahTranslation).map((value) => ({
    ...value,
    preBismillah: value.sequence === 9 ? false : getSurahPreBismillah,
    recitation: {
      audio: `${constants.SERVICE_URL.QURANICAUDIO}${getSpesificReciter?.folder.surah}${padNumber(value.sequence, 3)}.mp3`,
    },
  }));

  return quranEntireSurah;
};

const getSpesificSurahService = async (surahSequence: number, lang: string, reciter: number) => {
  const getQuranEntireSurah = await getEntireSurahService(lang, reciter);
  const getSpesificSurah = getQuranEntireSurah.find((quranSurah) => quranSurah.sequence === surahSequence) as IQuranSurah;
  const getSpesificQuranSurahAyah = await getSpesificSurahAyahService(surahSequence, lang, reciter);
  const formattedSurah = {
    ...getSpesificSurah,
    ayah: getSpesificQuranSurahAyah,
  };
  return formattedSurah;
};

export {
  getEntireSurahService,
  getSpesificSurahService,
};
