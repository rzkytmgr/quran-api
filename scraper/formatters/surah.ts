import { toUnicodeEscapeSequence } from './unicode';
import { ISourceResponses, ISurahFormatResult } from '../types';

export const formatSurah = (responses: ISourceResponses): ISurahFormatResult => {
  const surah = responses.quranEndpoint.data;

  return {
    text: {
      sequence: surah.number,
      ayahCount: surah.ayahCount,
      type: { arabic: toUnicodeEscapeSequence(surah.type.ar) },
      name: {
        arabic: {
          long: toUnicodeEscapeSequence(surah.asma.ar.long),
          short: toUnicodeEscapeSequence(surah.asma.ar.short),
        },
      },
    },
    translations: {
      id: {
        sequence: surah.number,
        type: { latin: surah.type.id },
        name: {
          latin: {
            long: surah.asma.id.long,
            short: surah.asma.id.short,
          },
        },
        translation: surah.asma.translation.id,
        tafsir: null,
      },
      en: {
        sequence: surah.number,
        type: { latin: surah.type.en },
        name: {
          latin: {
            long: surah.asma.en.long,
            short: surah.asma.en.short,
          },
        },
        translation: surah.asma.translation.en,
        tafsir: null,
      },
    },
  };
};
