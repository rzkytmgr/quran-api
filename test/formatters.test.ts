import { describe, expect, test } from 'vitest';
import { formatAyahs } from '../scraper/formatters/ayah';
import { formatPreBismillah } from '../scraper/formatters/pre-bismillah';
import { formatSurah } from '../scraper/formatters/surah';
import { toUnicodeEscapeSequence } from '../scraper/formatters/unicode';
import type { IAlQuranCloudResponse, IMinistryOfReligionResponse, IQuranEndpointResponse, ISourceResponses } from '../scraper/types';
import alquranCloudSurah114 from './snapshot/alquran-cloud-surah-114.json';

/** Payload riil hasil crawl AlQuran Cloud untuk surah 114 (disimpan sebagai fixture) */
const alquranCloudSurahResponse = alquranCloudSurah114 as IAlQuranCloudResponse;

const arabicAyahTexts = [
  'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
  'مَلِكِ النَّاسِ',
  'إِلَٰهِ النَّاسِ',
  'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
  'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
  'مِنَ الْجِنَّةِ وَالنَّاسِ',
];

const latinAyahReadings = [
  'Qul auzu birabbil naas',
  'Malikin naas',
  'Ilaahin naas',
  'Min sharril waswaasil khannaas',
  'Allazee yuwaswisu fee sudoorin naas',
  'Minal jinnati wannaas',
];

const buildQuranEndpointSurah114 = (overrides: Partial<Parameters<typeof formatPreBismillah>[0]> = {}): IQuranEndpointResponse => ({
  data: {
    number: 114,
    ayahCount: 6,
    type: { ar: 'مكة', id: 'Makkiyah', en: 'Meccan' },
    asma: {
      ar: { long: 'سورة الناس', short: 'الناس' },
      id: { long: 'Surah An-Nas', short: 'An-Nas' },
      en: { long: 'Surah An-Nas', short: 'An-Nas' },
      translation: { id: 'Manusia', en: 'Mankind' },
    },
    ayahs: arabicAyahTexts.map((arabicText, ayahIndex) => ({
      text: { ar: arabicText, read: latinAyahReadings[ayahIndex]! },
    })),
    ...overrides,
  },
});

const buildSourceResponses = (responses: {
  alquranCloud?: IAlQuranCloudResponse;
  quranEndpoint?: IQuranEndpointResponse;
  ministryOfReligion?: IMinistryOfReligionResponse;
}): ISourceResponses => ({
  alquranCloud: responses.alquranCloud ?? alquranCloudSurahResponse,
  quranEndpoint: responses.quranEndpoint ?? buildQuranEndpointSurah114(),
  ministryOfReligion: responses.ministryOfReligion ?? {
    data: latinAyahReadings.map((latinReading) => ({ latin: latinReading })),
  },
});

describe('crawler formatters — surah metadata', () => {
  test('teks arab di-escape unicode untuk seluruh karakter', () => {
    expect(toUnicodeEscapeSequence('ع')).toBe('\\u0639');
    expect(toUnicodeEscapeSequence('a~')).toBe('\\u0061\\u007e');
  });

  test('metadata surah: bagian arab escape unicode', () => {
    const result = formatSurah(buildSourceResponses({}));

    expect(result.text.type.arabic).toBe(toUnicodeEscapeSequence('مكة'));
    expect(result.text.name.arabic.long).toBe(toUnicodeEscapeSequence('سورة الناس'));
    expect(result.text.name.arabic.short).toBe(toUnicodeEscapeSequence('الناس'));
  });

  test('metadata surah: sequence & ayahCount dari quran endpoint', () => {
    const result = formatSurah(buildSourceResponses({}));

    expect(result.text.sequence).toBe(114);
    expect(result.text.ayahCount).toBe(6);
  });

  test('metadata surah: sequence konsisten & tidak tertukar antara terjemahan', () => {
    const result = formatSurah(buildSourceResponses({}));

    expect(result.translations.id.sequence).toBe(114);
    expect(result.translations.en.sequence).toBe(114);
    expect(result.translations.id.type.latin).toBe('Makkiyah');
    expect(result.translations.en.type.latin).toBe('Meccan');
    expect(result.translations.id.translation).toBe('Manusia');
    expect(result.translations.en.translation).toBe('Mankind');
    expect(result.translations.id.tafsir).toBeNull();
    expect(result.translations.en.tafsir).toBeNull();
  });
});

describe('crawler formatters — ayah', () => {
  test('teks ayah arab memakai sequence dari data riil AlQuran Cloud', () => {
    const result = formatAyahs(buildSourceResponses({}));

    expect(result.text.surah).toBe(114);
    expect(result.text.ayah).toHaveLength(6);

    const firstAyah = result.text.ayah[0]!;
    expect(firstAyah.sequence.quran).toBe(6231);
    expect(firstAyah.sequence.surah).toBe(1);
    expect(firstAyah.juz).toBe(30);
    expect(firstAyah.page).toBe(604);
    expect(firstAyah.hizb).toBe(240);
    expect(firstAyah.text).toBe(toUnicodeEscapeSequence(arabicAyahTexts[0]!));
  });

  test('sajda tanpa sajda menjadi false', () => {
    const result = formatAyahs(buildSourceResponses({}));

    expect(result.text.ayah.every((ayah) => ayah.sajda === false)).toBe(true);
  });

  test('sajda dengan nilai menjadi objek recommended/obligatory', () => {
    const sajdaAlquranCloud = {
      ...alquranCloudSurahResponse,
      data: alquranCloudSurahResponse.data.map((edition, editionIndex) => ({
        ...edition,
        ayahs: edition.ayahs.map((ayah, ayahIndex) => (editionIndex === 0 && ayahIndex === 0 ? { ...ayah, sajda: { recommended: 'true', obligatory: 'true' } } : ayah)),
      })),
    } as IAlQuranCloudResponse;

    const result = formatAyahs(buildSourceResponses({ alquranCloud: sajdaAlquranCloud }));

    expect(result.text.ayah[0]!.sajda).toEqual({ recommended: 'true', obligatory: 'true' });
    expect(result.text.ayah[1]!.sajda).toBe(false);
  });

  test('terjemahan indonesian: transliteration dari kemenag, translation dari edisi indonesia', () => {
    const result = formatAyahs(buildSourceResponses({}));

    expect(result.translations.id.surah).toBe(114);
    expect(result.translations.id.ayah[0]!.transliteration).toBe(latinAyahReadings[0]!);
    expect(result.translations.id.ayah[0]!.translation).toBe(alquranCloudSurahResponse.data[1]!.ayahs[0]!.text);
    expect(result.translations.id.ayah[0]!.tafsir).toBeNull();
  });

  test('terjemahan english: transliteration dari read quran endpoint, translation dari edisi english', () => {
    const result = formatAyahs(buildSourceResponses({}));

    expect(result.translations.en.surah).toBe(114);
    expect(result.translations.en.ayah[0]!.transliteration).toBe(latinAyahReadings[0]!);
    expect(result.translations.en.ayah[0]!.translation).toBe('Say, "I seek refuge in the Lord of mankind,');
    expect(result.translations.en.ayah[0]!.tafsir).toBeNull();
  });

  test('panjang terjemahan mengekor teks ayah arab', () => {
    const result = formatAyahs(buildSourceResponses({}));

    expect(result.translations.id.ayah).toHaveLength(result.text.ayah.length);
    expect(result.translations.en.ayah).toHaveLength(result.text.ayah.length);
  });
});

describe('crawler formatters — pre-bismillah', () => {
  test('surah dengan pre-bismillah dapat hasil teks escape + transliteration', () => {
    const surahWithPreBismillah = buildQuranEndpointSurah114({
      preBismillah: {
        text: { ar: 'أَعُوذُ', read: "A'uzu" },
        translation: { id: 'Aku berlindung', en: 'I seek refuge' },
      },
    });

    const result = formatPreBismillah(surahWithPreBismillah.data);

    expect(result).toEqual({
      id: { text: toUnicodeEscapeSequence('أَعُوذُ'), translation: 'Aku berlindung', transliteration: "A'uzu" },
      en: { text: toUnicodeEscapeSequence('أَعُوذُ'), translation: 'I seek refuge', transliteration: "A'uzu" },
    });
  });

  test('surah tanpa pre-bismillah (seperti di surah 9) menghasilkan null', () => {
    expect(formatPreBismillah(buildQuranEndpointSurah114().data)).toBeNull();
  });
});
