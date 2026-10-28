import { describe, expect, test } from 'vitest';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);
const BASE_URL = '/api/v1';

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

describe('Api v1 Ayah Routes (new app)', () => {
  test('GET /ayah/:ayah returns quran-wide ayah', async () => {
    const res = await request.get(`${BASE_URL}/ayah/123`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Data Retrieved Successfully');
    expect(res.body.data).toMatchObject(ayahMatcher);
    expect(res.body.data.sequence.quran).toBe(123);
  });

  test('GET /ayah/:ayah?lang=id returns indonesian translation', async () => {
    const res = await request.get(`${BASE_URL}/ayah/1142?lang=id`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toMatchObject(ayahMatcher);
  });

  test('GET /ayah/:ayah with custom reciter uses everyayah recitation folder 17', async () => {
    const res = await request.get(`${BASE_URL}/ayah/182?reciter=17`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.recitation.audio).toContain('Muhsin_Al_Qasim_192kbps/002175.mp3');
  });

  test('GET /ayah/:ayah beyond total ayah returns 400 contract', async () => {
    const res = await request.get(`${BASE_URL}/ayah/32322`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('BAD_REQUEST');
    expect(res.body.data).toBeNull();
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });

  test('GET /ayah/:ayah?lang=en&reciter=17 combines language and reciter', async () => {
    const res = await request.get(`${BASE_URL}/ayah/4221?lang=en&reciter=17`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toMatchObject(ayahMatcher);
    expect(res.body.data.recitation.audio).toContain('Muhsin_Al_Qasim_192kbps/041003.mp3');
  });

  test('GET /surah/:surah/ayah/:ayah with unknown reciter returns 400 contract', async () => {
    const res = await request.get(`${BASE_URL}/surah/114/ayah/1?reciter=1234`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('BAD_REQUEST');
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });

  test('GET /surah/:surah/ayah/:ayah returns 404 for unknown surah', async () => {
    const res = await request.get(`${BASE_URL}/surah/1234/ayah/1`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('NOT_FOUND');
  });

  test('GET /ayah/random returns random ayah', async () => {
    const res = await request.get(`${BASE_URL}/ayah/random`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toMatchObject(ayahMatcher);
  });
});
