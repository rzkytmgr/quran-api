import { aggregator } from '@shared/aggregator';
import { ayahAudioUrl } from '@shared/audio-url';
import { readDataset } from '@dataset/dataset-resolver';
import { findReciterById } from '../reciter/reciter.service';
import type { IServiceQuery } from '../common/general-query.schema';
import type { IRawQuranAyah, IRawQuranAyahTranslation, IFlatQuranAyah } from './ayah.types';

interface IQuranAyahDataset {
  surah: number;
  ayah: IRawQuranAyah[];
}

interface IQuranAyahTranslationDataset {
  surah: number;
  ayah: IRawQuranAyahTranslation[];
}

type IFlatAyah = IRawQuranAyah & { surah: number };
type IFlatAyahTranslation = IRawQuranAyahTranslation & { surah: number };

const flattenAyahDataset = <T extends object>(data: Array<{ surah: number; ayah: T[] }>): Array<T & { surah: number }> => {
  return data.flatMap(({ surah, ayah }) => ayah.map((item) => ({ ...item, surah })));
};

const buildQuranSequenceIndex = <T extends { sequence: { quran: number } }>(ayahs: T[]): Map<number, T> => {
  return new Map(ayahs.map((item) => [item.sequence.quran, item]));
};

const getEntireAyahService = (): IQuranAyahDataset[] => {
  return readDataset<IQuranAyahDataset[]>('entire-quran-ayah');
};

let ayahSequenceIndex: Map<number, IFlatAyah> | undefined;

const getQuranSequenceIndexService = (): Map<number, IFlatAyah> => {
  ayahSequenceIndex ??= buildQuranSequenceIndex(flattenAyahDataset(getEntireAyahService()));
  return ayahSequenceIndex;
};

const ayahTranslationIndexPerLang = new Map<string, Map<number, IFlatAyahTranslation>>();

const getQuranSequenceTranslationIndexService = (lang: string): Map<number, IFlatAyahTranslation> => {
  let translationIndex = ayahTranslationIndexPerLang.get(lang);
  if (!translationIndex) {
    const ayahTranslation = readDataset<IQuranAyahTranslationDataset[]>(['translation', 'lang', lang, 'entire-quran-ayah-translation']);
    translationIndex = buildQuranSequenceIndex(flattenAyahDataset(ayahTranslation));
    ayahTranslationIndexPerLang.set(lang, translationIndex);
  }
  return translationIndex;
};

const getSpecificAyahService = async (ayahSequence: number, query: IServiceQuery): Promise<IFlatQuranAyah | undefined> => {
  const ayatIndex = getQuranSequenceIndexService();
  const translationIndex = getQuranSequenceTranslationIndexService(query.lang as string);
  const reciter = findReciterById(query.reciter as number);

  const rawAyah = ayatIndex.get(ayahSequence);
  const rawTranslation = translationIndex.get(ayahSequence);
  if (!rawAyah || !rawTranslation) {
    return undefined;
  }

  const aggregatedAyah = aggregator<IFlatQuranAyah>(rawAyah as unknown as IFlatQuranAyah, rawTranslation as unknown as IFlatQuranAyah);
  aggregatedAyah.recitation = {
    audio: ayahAudioUrl(reciter?.folder.ayah as string, aggregatedAyah.surah, aggregatedAyah.sequence.surah),
  };

  return aggregatedAyah;
};

const getSpecificSurahAyahService = async (surahSequence: number, query: IServiceQuery): Promise<IFlatQuranAyah[]> => {
  const entireAyah = getEntireAyahService();
  const entireTranslation = readDataset<IQuranAyahTranslationDataset[]>(['translation', 'lang', query.lang as string, 'entire-quran-ayah-translation']);
  const reciter = findReciterById(query.reciter as number);

  const surahAyah = (entireAyah.find((item) => item.surah === surahSequence)?.ayah ?? []) as unknown as IFlatQuranAyah[];
  const surahTranslation = (entireTranslation.find((item) => item.surah === surahSequence)?.ayah ?? []) as unknown as IFlatQuranAyah[];

  return aggregator<IFlatQuranAyah[]>(surahAyah, surahTranslation).map((ayah) => ({
    ...ayah,
    recitation: {
      audio: ayahAudioUrl(reciter?.folder.ayah as string, surahSequence, ayah.sequence.surah),
    },
  }));
};

export { getEntireAyahService, getSpecificAyahService, getSpecificSurahAyahService };
