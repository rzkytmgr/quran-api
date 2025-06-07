import { describe, expect, test } from 'vitest';
import { BASE_URL, request } from './setup';
import { ayahMatcher, surahMatcher } from './matchers';

describe('Ayah Routes', () => {
  describe('GET /surah/:surah/ayah/:ayah - get spesific ayah in surah', () => {
    const surahSpesificAyahChecker = (res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.message).toBe('string');
      expect(res.body.data).toMatchObject({
        ...surahMatcher,
        ayah: ayahMatcher,
      });
    };

    test('should return spesific ayah in a surah', async () => {
      const res = await request.get(`${BASE_URL}/surah/114/ayah/1`);
      surahSpesificAyahChecker(res);
    });

    test('should return spesific ayah in a surah with custom language `Bahasa Indonesia`', async () => {
      const res = await request.get(`${BASE_URL}/surah/114/ayah/1?lang=id`);
      surahSpesificAyahChecker(res);
    });

    test('should return spesific ayah in a surah with custom language `English`', async () => {
      const res = await request.get(`${BASE_URL}/surah/114/ayah/1?lang=en`);
      surahSpesificAyahChecker(res);
    });

    test('should return spesific ayah in a surah with custom language `Bahasa Indonesia` with custom reciter', async () => {
      const res = await request.get(`${BASE_URL}/surah/114/ayah/1?lang=en&reciter=25`);
      surahSpesificAyahChecker(res);
    });

    test('should return spesific ayah in a surah with custom language `English` with custom reciter', async () => {
      const res = await request.get(`${BASE_URL}/surah/114/ayah/1?lang=en&reciter=17`);
      surahSpesificAyahChecker(res);
    });

    test('should return not found because surah is not exist', async () => {
      const res = await request.get(`${BASE_URL}/surah/1141/ayah/1?lang=en&reciter=17`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('NOT_FOUND');
      expect(res.body.data).toBeNull();
      expect(res.body).toHaveProperty('error');
      expect(Array.isArray(res.body.error.details)).toBe(true);
    });

    test('should return not found because ayah is not exist', async () => {
      const res = await request.get(`${BASE_URL}/surah/114/ayah/12?lang=en&reciter=17`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('NOT_FOUND');
      expect(res.body.data).toBeNull();
      expect(res.body).toHaveProperty('error');
      expect(Array.isArray(res.body.error.details)).toBe(true);
    });
  });

  const spesificAyahChecker = (res) => {
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.message).toBe('string');
    expect(res.body.data).toMatchObject(ayahMatcher);
  };

  describe('GET /ayah/:ayah - get specific quran ayah', () => {
    test('should return specific quran ayah', async () => {
      const res = await request.get(`${BASE_URL}/ayah/123`);
      spesificAyahChecker(res);
    });

    test('should return specific quran ayah with `Indonesia` language', async () => {
      const res = await request.get(`${BASE_URL}/ayah/1142?lang=id`);
      spesificAyahChecker(res);
    });

    test('should return specific quran ayah with `English` language', async () => {
      const res = await request.get(`${BASE_URL}/ayah/4221?lang=en`);
      spesificAyahChecker(res);
    });

    test('should return specific quran ayah with custom reciter', async () => {
      const res = await request.get(`${BASE_URL}/ayah/182?reciter=17`);
      spesificAyahChecker(res);
    });

    test('should return specific quran ayah with custom reciter and Bahasa', async () => {
      const res = await request.get(`${BASE_URL}/ayah/1421?lang=id&reciter=17`);
      spesificAyahChecker(res);
    });

    test('should return specific quran ayah with custom reciter and English', async () => {
      const res = await request.get(`${BASE_URL}/ayah/5321?lang=en&reciter=25`);
      spesificAyahChecker(res);
    });

    test('should return 404 for non-existing quran ayah', async () => {
      const res = await request.get(`${BASE_URL}/ayah/32322`);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('BAD_REQUEST');
      expect(res.body.data).toBeNull();
      expect(res.body).toHaveProperty('error');
      expect(Array.isArray(res.body.error.details)).toBe(true);
    });
  });

  describe('GET /ayah/random - get random quran ayah', () => {
    test('should return random quran ayah', async () => {
      const res = await request.get(`${BASE_URL}/ayah/random`);
      spesificAyahChecker(res);
    });

    test('should return random quran ayah with `Indonesia` language', async () => {
      const res = await request.get(`${BASE_URL}/ayah/random?lang=id`);
      spesificAyahChecker(res);
    });

    test('should return random quran ayah with `English` language', async () => {
      const res = await request.get(`${BASE_URL}/ayah/random?lang=en`);
      spesificAyahChecker(res);
    });

    test('should return random quran ayah with custom reciter', async () => {
      const res = await request.get(`${BASE_URL}/ayah/random?reciter=17`);
      spesificAyahChecker(res);
    });

    test('should return random quran ayah with custom reciter and Bahasa', async () => {
      const res = await request.get(`${BASE_URL}/ayah/random?lang=id&reciter=17`);
      spesificAyahChecker(res);
    });

    test('should return random quran ayah with custom reciter and English', async () => {
      const res = await request.get(`${BASE_URL}/ayah/random?lang=en&reciter=25`);
      spesificAyahChecker(res);
    });
  });
});
