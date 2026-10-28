import { SURAH_WITHOUT_PRE_BISMILLAH, TOTAL_AYAH, TOTAL_SURAH } from './config';
import type { ISurahCrawlResult } from './types';

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length > 0;
const isPositiveInteger = (value: unknown): value is number => typeof value === 'number' && Number.isInteger(value) && value > 0;

const validateAyahText = (problems: string[], description: string, ayah: unknown) => {
  if (typeof ayah !== 'object' || ayah === null) {
    problems.push(`${description}: ayah data is not an object`);
    return;
  }

  const ayahData = ayah as { sequence: unknown; juz: unknown; manzil: unknown; page: unknown; ruku: unknown; hizb: unknown; text: unknown };

  if (!isPositiveInteger(ayahData.page) || !isPositiveInteger(ayahData.juz)) {
    problems.push(`${description}: juz/page data is not valid`);
  }
  if (!isNonEmptyString(ayahData.text)) {
    problems.push(`${description}: Arabic text is empty`);
  }
};

export const validateCrawlResults = (crawlResults: Array<ISurahCrawlResult | undefined>): string[] => {
  const problems: string[] = [];
  let totalAyahNumber = 0;
  const quranSequenceNumbers = new Set<number>();

  crawlResults.forEach((crawlResult, resultIndex) => {
    const surahNumber = resultIndex + 1;

    if (!crawlResult) {
      problems.push(`surah ${surahNumber}: no data — incomplete or disconnected crawl`);
      return;
    }

    const surahMetadata = crawlResult.surah.text;
    const surahAyahTexts = crawlResult.ayahs.text;
    const idTranslation = crawlResult.ayahs.translations.id;
    const enTranslation = crawlResult.ayahs.translations.en;

    if (surahMetadata.sequence !== surahNumber) {
      problems.push(`surah ${surahNumber}: surah sequence '${surahMetadata.sequence}' does not match`);
    }
    if (surahMetadata.ayahCount !== surahAyahTexts.ayah.length) {
      problems.push(`surah ${surahNumber}: ayahCount ${surahMetadata.ayahCount} != number of ayah ${surahAyahTexts.ayah.length}`);
    }
    if (surahAyahTexts.surah !== surahNumber) {
      problems.push(`surah ${surahNumber}: ayah text row is for surah ${surahAyahTexts.surah}`);
    }
    if (idTranslation.surah !== surahNumber || enTranslation.surah !== surahNumber) {
      problems.push(`surah ${surahNumber}: translation row is for another surah`);
    }
    if (idTranslation.ayah.length !== surahAyahTexts.ayah.length || enTranslation.ayah.length !== surahAyahTexts.ayah.length) {
      problems.push(`surah ${surahNumber}: translation row length does not equal the number of ayah`);
    }
    if (!isNonEmptyString(surahMetadata.type.arabic) || !isNonEmptyString(surahMetadata.name.arabic.long) || !isNonEmptyString(surahMetadata.name.arabic.short)) {
      problems.push(`surah ${surahNumber}: arabic metadata is empty`);
    }

    if (crawlResult.preBismillah) {
      const hasEmptyField = [crawlResult.preBismillah.id, crawlResult.preBismillah.en].some(
        (bismillah) => !isNonEmptyString(bismillah.text) || !isNonEmptyString(bismillah.translation) || !isNonEmptyString(bismillah.transliteration),
      );
      if (hasEmptyField) {
        problems.push(`surah ${surahNumber}: pre-bismillah has an empty field`);
      }
    } else if (!SURAH_WITHOUT_PRE_BISMILLAH.has(surahNumber)) {
      problems.push(`surah ${surahNumber}: pre-bismillah is missing`);
    }

    surahAyahTexts.ayah.forEach((ayahText, ayahIndex) => {
      const description = `surah ${surahNumber} ayah ${ayahIndex + 1}`;

      validateAyahText(problems, description, ayahText);
      if (!isPositiveInteger(ayahText.sequence.quran) || !isPositiveInteger(ayahText.sequence.surah)) {
        problems.push(`${description}: ayah sequence is not valid`);
      }

      const idAyah = idTranslation.ayah[ayahIndex];
      const enAyah = enTranslation.ayah[ayahIndex];
      if (!idAyah || !enAyah) {
        return;
      }
      if (!isNonEmptyString(idAyah.transliteration) || !isNonEmptyString(idAyah.translation)) {
        problems.push(`${description}: indonesian translation is empty`);
      }
      if (!isNonEmptyString(enAyah.transliteration) || !isNonEmptyString(enAyah.translation)) {
        problems.push(`${description}: english translation is empty`);
      }

      totalAyahNumber += 1;
      quranSequenceNumbers.add(ayahText.sequence.quran);
    });
  });

  if (crawlResults.length !== TOTAL_SURAH) {
    problems.push(`number of surahs ${crawlResults.length}, supposed to be ${TOTAL_SURAH}`);
  }
  if (totalAyahNumber !== TOTAL_AYAH) {
    problems.push(`total ayahs ${totalAyahNumber}, supposed to be ${TOTAL_AYAH}`);
  }
  if (quranSequenceNumbers.size !== TOTAL_AYAH) {
    problems.push(`total 'quran' ayah sequences only ${quranSequenceNumbers.size} unique, supposed to be ${TOTAL_AYAH}`);
  }

  return problems;
};
