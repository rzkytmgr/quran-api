import { describe, expect, test } from 'vitest';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);
const BASE_URL = '/api/v1';

const surahMatcher = {
  sequence: expect.any(Number),
  ayahCount: expect.any(Number),
  type: {
    arabic: expect.any(String),
    latin: expect.any(String),
  },
  name: {
    arabic: { long: expect.any(String), short: expect.any(String) },
    latin: { long: expect.any(String), short: expect.any(String) },
  },
  translation: expect.any(String),
  tafsir: null,
  preBismillah: expect.anything(),
  recitation: { audio: expect.any(String) },
};

const ayahMatcher = {
  sequence: { quran: expect.any(Number), surah: expect.any(Number) },
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
  recitation: { audio: expect.any(String) },
};

describe('Api v1 Surah Routes (new app)', () => {
  test('GET /surah returns all surahs with default query', async () => {
    const res = await request.get(`${BASE_URL}/surah`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Data Retrieved Successfully');
    expect(res.body.data).toHaveLength(114);
    expect(res.body.data[0]).toMatchObject(surahMatcher);
    expect(res.body.data[0].preBismillah).toMatchObject({ text: expect.any(String), transliteration: expect.any(String) });
    expect(res.body.data[8].preBismillah).toBe(false);
  });

  test('GET /surah?lang=id returns indonesian translations', async () => {
    const res = await request.get(`${BASE_URL}/surah?lang=id`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data[0]).toMatchObject(surahMatcher);
    expect(res.body.data[0].translation).toBe('Pembukaan');
  });

  test('GET /surah?lang=zz returns 400 contract', async () => {
    const res = await request.get(`${BASE_URL}/surah?lang=zz`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('BAD_REQUEST');
    expect(res.body.data).toBeNull();
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });

  test('GET /surah/:surah returns specific surah including ayah list', async () => {
    const res = await request.get(`${BASE_URL}/surah/114`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toMatchObject({ ...surahMatcher, ayah: expect.any(Array) });
    expect(res.body.data.ayah[0]).toMatchObject(ayahMatcher);
    expect(res.body.data.ayah[0].recitation.audio).toContain('everyayah.com/data/Yasser_Ad-Dussary_128kbps/114001.mp3');
  });

  test('GET /surah/:surah with custom reciter changes recitation folder', async () => {
    const res = await request.get(`${BASE_URL}/surah/1?reciter=17`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.recitation.audio).toContain('abdul_muhsin_alqasim/001.mp3');
  });

  test('GET /surah?lang=en&reciter=17 combines language and reciter', async () => {
    const res = await request.get(`${BASE_URL}/surah?lang=en&reciter=17`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data[0]).toMatchObject(surahMatcher);
    expect(res.body.data[0].translation).toBe('The Opening');
    expect(res.body.data[0].recitation.audio).toContain('abdul_muhsin_alqasim/001.mp3');
  });

  test('GET /surah/:surah with unknown reciter returns 400 contract', async () => {
    const res = await request.get(`${BASE_URL}/surah/1?reciter=1234`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('BAD_REQUEST');
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });

  test('GET /surah/:surah returns 404 contract for unknown surah', async () => {
    const res = await request.get(`${BASE_URL}/surah/1234`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('NOT_FOUND');
    expect(res.body.data).toBeNull();
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });

  test('GET /surah/:surah/ayah/:ayah returns surah with single ayah', async () => {
    const res = await request.get(`${BASE_URL}/surah/114/ayah/1?lang=id`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toMatchObject({ ...surahMatcher, ayah: ayahMatcher });
  });

  test('GET /surah/:surah/ayah/:ayah returns 404 for unknown ayah within surah', async () => {
    const res = await request.get(`${BASE_URL}/surah/114/ayah/12`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('NOT_FOUND');
  });
});
