import { expect } from 'vitest';

export const reciterMatcher = {
  id: expect.any(Number),
  name: expect.any(String),
};

export const ayahMatcher = {
  sequence: {
    quran: expect.any(Number),
    surah: expect.any(Number),
  },
  juz: expect.any(Number),
  manzil: expect.any(Number),
  page: expect.any(Number),
  ruku: expect.any(Number),
  hizb: expect.any(Number),
  sajda: expect.anything(),
  text: expect.any(String),
  transliteration: expect.any(String),
  translation: expect.any(String),
  tafsir: null,
  recitation: {
    audio: expect.any(String),
  },
};

export const surahMatcher = {
  sequence: expect.any(Number),
  ayahCount: expect.any(Number),
  type: {
    arabic: expect.any(String),
    latin: expect.any(String),
  },
  name: {
    arabic: {
      long: expect.any(String),
      short: expect.any(String),
    },
    latin: {
      long: expect.any(String),
      short: expect.any(String),
    },
  },
  translation: expect.any(String),
  tafsir: null,
  preBismillah: expect.anything(),
  recitation: {
    audio: expect.any(String),
  },
};
