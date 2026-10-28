import { describe, expect, test } from 'vitest';
import { validateCrawlResults } from '../scraper/validator';
import type { IPreBismillahTranslations, ISurahCrawlResult } from '../scraper/types';

const SURAH_TOTAL = 114;
const TOTAL_AYAH = 6_236;

/** [7, 286, 111 surah berisi 53 ayah, dan 60] — total 7 + 286 + 111*53 + 60 = 6236 ayah */
const SURAH_AYAH_COUNTS = [7, 286, ...Array.from<number>({ length: 111 }).fill(53), 60];

const FULL_PRE_BISMILLAH: IPreBismillahTranslations = {
  id: { text: 'بِسْمِ', translation: 'Dengan nama Allah', transliteration: 'Bismillaahir Rahmaanir Raheem' },
  en: { text: 'بِسْمِ', translation: 'In the name of Allah', transliteration: 'Bismillaahir Rahmaanir Raheem' },
};

let nextQuranSequence = 1;

const buildCrawlResult = (surahNumber: number, ayahCount: number, preBismillah: IPreBismillahTranslations | null): ISurahCrawlResult => {
  const ayah = Array.from({ length: ayahCount }, () => {
    const quranSequence = nextQuranSequence;
    nextQuranSequence += 1;

    return {
      sequence: { quran: quranSequence, surah: surahNumber },
      juz: 1,
      manzil: 1,
      page: 3,
      ruku: 1,
      hizb: 5,
      sajda: false,
      text: 'ا',
    };
  });

  const translationAyah = ayah.map((ayahText) => ({
    sequence: { quran: ayahText.sequence.quran, surah: surahNumber },
    transliteration: 'Bismillaahir',
    translation: 'Dengan nama Allah',
    tafsir: null,
  }));

  return {
    surah: {
      text: {
        sequence: surahNumber,
        ayahCount,
        type: { arabic: 'مكة' },
        name: { arabic: { short: 'الفاتحة', long: 'سُورَةُ ٱلْفَاتِحَةِ' } },
      },
      translations: {
        id: { sequence: surahNumber, type: { latin: 'Makkiyah' }, name: { latin: { short: 'Al-Fatihah', long: 'Surah Al-Fatihah' } }, translation: 'Pembukaan', tafsir: null },
        en: { sequence: surahNumber, type: { latin: 'Meccan' }, name: { latin: { short: 'Al-Faatiha', long: 'Sura Al-Faatiha' } }, translation: 'The Opening', tafsir: null },
      },
    },
    ayahs: {
      text: { surah: surahNumber, ayah },
      translations: {
        id: { surah: surahNumber, ayah: translationAyah },
        en: { surah: surahNumber, ayah: translationAyah },
      },
    },
    preBismillah,
  };
};

const buildAllCrawlResults = (preBismillahOf: (surahNumber: number) => IPreBismillahTranslations | null): ISurahCrawlResult[] =>
  SURAH_AYAH_COUNTS.map((ayahCount, surahIndex) => buildCrawlResult(surahIndex + 1, ayahCount, preBismillahOf(surahIndex + 1)));

const isPreBismillahException = (surahNumber: number): boolean => surahNumber === 1 || surahNumber === 9;

describe('crawler validator — pengecualian pre-bismillah surah 1 dan 9', () => {
  test('surah 1 dan 9 tanpa pre-bismillah tetap valid; tidak ada masalah sama sekali', () => {
    const problems = validateCrawlResults(buildAllCrawlResults((surahNumber) => (isPreBismillahException(surahNumber) ? null : FULL_PRE_BISMILLAH)));

    expect(problems).toEqual([]);
  });

  test('surah 2 tanpa pre-bismillah dilaporkan hilang', () => {
    const problems = validateCrawlResults(buildAllCrawlResults((surahNumber) => (surahNumber === 2 || isPreBismillahException(surahNumber) ? null : FULL_PRE_BISMILLAH)));

    expect(problems).toContain('surah 2: pre-bismillah is missing');
    expect(problems).toHaveLength(1);
  });

  test('surah 3 tanpa pre-bismillah dilaporkan hilang, surah 9 tanpa pre-bismillah tetap dilewati', () => {
    const problems = validateCrawlResults(buildAllCrawlResults((surahNumber) => (surahNumber === 3 || isPreBismillahException(surahNumber) ? null : FULL_PRE_BISMILLAH)));

    expect(problems).toEqual(['surah 3: pre-bismillah is missing']);
  });

  test('surah tanpa pengecualian dengan pre-bismillah kosong dilaporkan', () => {
    const emptyPreBismillah: IPreBismillahTranslations = {
      id: { text: '', translation: 'Dengan nama Allah', transliteration: 'Bismillaahir' },
      en: FULL_PRE_BISMILLAH.en,
    };

    const problems = validateCrawlResults(
      buildAllCrawlResults((surahNumber) => (surahNumber === 3 ? emptyPreBismillah : isPreBismillahException(surahNumber) ? null : FULL_PRE_BISMILLAH)),
    );

    expect(problems).toEqual(['surah 3: pre-bismillah has an empty field']);
  });

  test('sanity: fixture tanpa pengecualian (114 surah ber-pre-bismillah) tetap lolos validasi penuh', () => {
    const problems = validateCrawlResults(buildAllCrawlResults(() => FULL_PRE_BISMILLAH));

    expect(problems).toEqual([]);
  });
});

describe('crawler validator — guard jumlah dasar', () => {
  test('jumlah surah dan ayah fixture sesuai konstanta scraper (114 surah, 6236 ayah)', () => {
    expect(SURAH_AYAH_COUNTS).toHaveLength(SURAH_TOTAL);
    expect(SURAH_AYAH_COUNTS.reduce((sum, ayahCount) => sum + ayahCount, 0)).toBe(TOTAL_AYAH);
  });
});
