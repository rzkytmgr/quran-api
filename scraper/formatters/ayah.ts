import { toUnicodeEscapeSequence } from './unicode';
import { IAlQuranCloudEdition, IAyahsFormatResult, IQuranEndpointSurah, IRawQuranAyah, ISourceResponses, ISurahAyahTextResult, ISurahAyahTranslationResult } from '../types';

const buildAyahTexts = (quranEndpointSurah: IQuranEndpointSurah, englishEdition: IAlQuranCloudEdition): IRawQuranAyah[] =>
  quranEndpointSurah.ayahs.map((quranEndpointAyah, ayahIndex) => {
    const alquranCloudAyah = englishEdition.ayahs[ayahIndex];

    return {
      sequence: {
        quran: alquranCloudAyah.number,
        surah: alquranCloudAyah.numberInSurah,
      },
      juz: alquranCloudAyah.juz,
      manzil: alquranCloudAyah.manzil,
      page: alquranCloudAyah.page,
      ruku: alquranCloudAyah.ruku,
      hizb: alquranCloudAyah.hizbQuarter,
      sajda: alquranCloudAyah.sajda
        ? {
            recommended: alquranCloudAyah.sajda.recommended,
            obligatory: alquranCloudAyah.sajda.obligatory,
          }
        : false,
      text: toUnicodeEscapeSequence(quranEndpointAyah.text.ar),
    };
  });

export const formatAyahs = (responses: ISourceResponses): IAyahsFormatResult => {
  const surah = responses.quranEndpoint.data;
  const [englishEdition, indonesianEdition] = responses.alquranCloud.data;
  const ayahTexts = buildAyahTexts(surah, englishEdition);

  const buildAyahTranslations = (transliterationList: string[], translationList: string[]): ISurahAyahTranslationResult => ({
    surah: surah.number,
    ayah: ayahTexts.map((ayahText, ayahIndex) => ({
      sequence: ayahText.sequence,
      transliteration: transliterationList[ayahIndex],
      translation: translationList[ayahIndex],
      tafsir: null,
    })),
  });

  return {
    text: { surah: surah.number, ayah: ayahTexts } satisfies ISurahAyahTextResult,
    translations: {
      id: buildAyahTranslations(
        responses.ministryOfReligion.data.map((ministryAyah) => ministryAyah.latin),
        indonesianEdition.ayahs.map((alquranCloudAyah) => alquranCloudAyah.text),
      ),
      en: buildAyahTranslations(
        surah.ayahs.map((quranEndpointAyah) => quranEndpointAyah.text.read),
        englishEdition.ayahs.map((alquranCloudAyah) => alquranCloudAyah.text),
      ),
    },
  };
};
