import { mkdir, readFile, readdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { clearProgress } from '../scraper/checkpoint';
import { runCrawler } from '../scraper/crawler';
import type { IAlQuranCloudResponse, IMinistryOfReligionResponse, IQuranEndpointResponse } from '../scraper/types';

/** [7, 286, 111 surah berisi 53 ayah, dan 60] — total 7 + 286 + 111*53 + 60 = 6236 ayah */
const SURAH_AYAH_COUNTS = [7, 286, ...Array.from<number>({ length: 111 }).fill(53), 60];
const ayahCountOf = (surahNumber: number): number => SURAH_AYAH_COUNTS[surahNumber - 1]!;

vi.mock('../scraper/fetch-sources', () => {
  let nextQuranSequence = 1;

  return {
    fetchSurahFromAlquranCloud: async (surahNumber: number): Promise<IAlQuranCloudResponse> => {
      const buildEdition = () => ({
        ayahs: Array.from({ length: ayahCountOf(surahNumber) }, (unused, ayahIndex) => ({
          number: nextQuranSequence++,
          numberInSurah: ayahIndex + 1,
          juz: 1,
          manzil: 1,
          page: 3,
          ruku: 1,
          hizbQuarter: 5,
          sajda: false,
          text: 'ا',
        })),
      });

      return { data: [buildEdition(), buildEdition()] };
    },

    fetchSurahFromQuranEndpoint: async (surahNumber: number): Promise<IQuranEndpointResponse> => ({
      data: {
        number: surahNumber,
        ayahCount: ayahCountOf(surahNumber),
        type: { ar: 'مكة', id: 'Makkiyyah', en: 'Meccan' },
        asma: {
          ar: { long: 'سُورَةُ ٱلْفَاتِحَةِ', short: 'الفاتحة' },
          id: { long: 'Surah Al-Fatihah', short: 'Al-Fatihah' },
          en: { long: 'Sura Al-Faatiha', short: 'Al-Faatiha' },
          translation: { id: 'Pembukaan', en: 'The Opening' },
        },
        ayahs: Array.from({ length: ayahCountOf(surahNumber) }, () => ({ text: { ar: 'ا', read: 'Alif' } })),
        preBismillah:
          surahNumber === 1 || surahNumber === 9 ? undefined : { text: { ar: 'ا', read: 'Alif' }, translation: { id: 'Dengan nama Allah', en: 'In the name of Allah' } },
      },
    }),

    fetchSurahAyahsFromMinistryOfReligion: async (surahNumber: number): Promise<IMinistryOfReligionResponse> => ({
      data: Array.from({ length: ayahCountOf(surahNumber) }, () => ({ latin: 'Alif' })),
    }),
  };
});

describe('crawler runCrawler — flow akumulasi seluruh surah', () => {
  let outputDir: string;

  beforeEach(async () => {
    outputDir = path.join(os.tmpdir(), `quran-api-crawler-test-${process.pid}-${Date.now()}`);
    await mkdir(outputDir, { recursive: true });
    await clearProgress();
  });

  afterEach(async () => {
    await rm(outputDir, { recursive: true, force: true });
    await clearProgress();
  });

  test('crawl penuh 114 surah lolos validasi dan menulis 8 file db (total 6236 ayah terakumulasi dari semua surah)', async () => {
    await runCrawler([`--out=${outputDir}`]);

    const rootEntries = (await readdir(outputDir)).sort();
    expect(rootEntries).toEqual(['entire-quran-ayah.db.json', 'entire-quran-surah.db.json', 'translation']);

    for (const languageFolder of ['en', 'id']) {
      const translationEntries = (await readdir(path.join(outputDir, 'translation', 'lang', languageFolder))).sort();
      expect(translationEntries).toEqual(['entire-quran-ayah-translation.db.json', 'entire-quran-surah-translation.db.json', 'pre-bismillah.db.json']);
    }

    const entireQuranAyah = JSON.parse(await readFile(path.join(outputDir, 'entire-quran-ayah.db.json'), 'utf-8')) as Array<{ ayah: unknown[] }>;
    expect(entireQuranAyah).toHaveLength(114);
    expect(entireQuranAyah.reduce((totalAyah, ayahRow) => totalAyah + ayahRow.ayah.length, 0)).toBe(6_236);

    const entireQuranSurah = JSON.parse(await readFile(path.join(outputDir, 'entire-quran-surah.db.json'), 'utf-8')) as Array<{ sequence: number }>;
    expect(entireQuranSurah).toHaveLength(114);
    expect(entireQuranSurah.map((surahRow) => surahRow.sequence)).toEqual(Array.from({ length: 114 }, (unused, surahIndex) => surahIndex + 1));
  });
});
