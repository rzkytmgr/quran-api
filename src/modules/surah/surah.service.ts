import { aggregator } from '@shared/aggregator';
import { surahAudioUrl } from '@shared/audio-url';
import { readDataset } from '@dataset/dataset-resolver';
import { findReciterById } from '../reciter/reciter.service';
import type { IServiceQuery } from '../common/general-query.schema';
import type { IPreBismillah, IRawQuranSurah, IRawQuranSurahTranslation, IQuranSurah } from './surah.types';
import { getSpecificSurahAyahService } from '../ayah/ayah.service';

const getEntireSurahService = async (query: IServiceQuery): Promise<Array<Partial<IQuranSurah>>> => {
  const [rawSurah, rawSurahTranslation, preBismillah, reciter] = await Promise.all([
    readDataset<IRawQuranSurah[]>('entire-quran-surah'),
    readDataset<IRawQuranSurahTranslation[]>(['translation', 'lang', query.lang as string, 'entire-quran-surah-translation']),
    readDataset<IPreBismillah>(['translation', 'lang', query.lang as string, 'pre-bismillah']),
    findReciterById(query.reciter as number),
  ]);

  const aggregatedSurah = aggregator<IQuranSurah[]>(rawSurah, rawSurahTranslation);
  return aggregatedSurah.map((surah) => ({
    ...surah,
    preBismillah: surah.sequence !== 9 ? preBismillah : false,
    recitation: { audio: surahAudioUrl(reciter?.folder.surah as string, surah.sequence) },
  }));
};

const getSpecificSurahService = async (surahSequence: number, query: IServiceQuery): Promise<Partial<IQuranSurah> | null> => {
  const entireSurah = await getEntireSurahService(query);
  const selectedSurah = entireSurah.find((surah) => surah.sequence === surahSequence);

  const surahAyah = await getSpecificSurahAyahService(surahSequence, query);

  return selectedSurah ? { ...selectedSurah, ayah: surahAyah } : null;
};

export { getEntireSurahService, getSpecificSurahService };
