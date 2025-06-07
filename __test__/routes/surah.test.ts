import { describe, expect, test } from 'vitest';
import { BASE_URL, request } from './setup';
import { ayahMatcher, surahMatcher } from './matchers';

describe('Surah Routes', () => {
  describe('GET /surah - get all quran surah', () => {
    const entireSurahChecker = (res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.message).toBe('string');
      expect(Array.isArray(res.body.data)).toBe(true);

      const surah = res.body.data[0];
      expect(surah).toMatchObject(surahMatcher);
    };

    test('should return all quran surah with default query', async () => {
      const res = await request.get(`${BASE_URL}/surah`);
      entireSurahChecker(res);
    });

    test('should return all quran surah custom language `Bahasa Indonesia`', async () => {
      const res = await request.get(`${BASE_URL}/surah?lang=id`);
      entireSurahChecker(res);
    });

    test('should return all quran surah custom language `English`', async () => {
      const res = await request.get(`${BASE_URL}/surah?lang=en`);
      entireSurahChecker(res);
    });

    test('should return all quran surah custom language `Bahasa Indonesia` with custom reciter', async () => {
      const res = await request.get(`${BASE_URL}/surah?lang=en&reciter=25`);
      entireSurahChecker(res);
    });

    test('should return all quran surah custom language `English` with custom reciter', async () => {
      const res = await request.get(`${BASE_URL}/surah?lang=en&reciter=17`);
      entireSurahChecker(res);
    });
  });

  describe('GET /surah/:surah - get specific surah', () => {
    const spesificSurahChecker = (res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.message).toBe('string');
      expect(typeof res.body.data).toBe('object');

      const surah = res.body.data;
      expect(surah).toMatchObject({
        ...surahMatcher,
        ayah: expect.any(Array),
      });

      const ayah = surah.ayah[0];
      expect(ayah).toMatchObject(ayahMatcher);
    };

    test('should return specific surah by surah sequence', async () => {
      const res = await request.get(`${BASE_URL}/surah/1`);
      spesificSurahChecker(res);
    });

    test('should return specific surah by surah sequence with `Indonesia` language', async () => {
      const res = await request.get(`${BASE_URL}/surah/1?lang=id`);
      spesificSurahChecker(res);
    });

    test('should return specific surah by surah sequence with `English` language', async () => {
      const res = await request.get(`${BASE_URL}/surah/1?lang=en`);
      spesificSurahChecker(res);
    });

    test('should return specific surah by surah sequence with custom reciter', async () => {
      const res = await request.get(`${BASE_URL}/surah/1?reciter=17`);
      spesificSurahChecker(res);
    });

    test('should return specific surah by surah sequence with custom reciter and Bahasa', async () => {
      const res = await request.get(`${BASE_URL}/surah/1?lang=id&reciter=17`);
      spesificSurahChecker(res);
    });

    test('should return specific surah by surah sequence with custom reciter and English', async () => {
      const res = await request.get(`${BASE_URL}/surah/1?lang=en&reciter=25`);
      spesificSurahChecker(res);
    });

    test('should return 404 for non-existing quran surah', async () => {
      const res = await request.get(`${BASE_URL}/surah/1234`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('NOT_FOUND');
      expect(res.body.data).toBeNull();
      expect(res.body).toHaveProperty('error');
      expect(Array.isArray(res.body.error.details)).toBe(true);
    });
  });
});
