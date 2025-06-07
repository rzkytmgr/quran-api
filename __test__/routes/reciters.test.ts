import { describe, expect, test } from 'vitest';
import { BASE_URL, request } from './setup';
import { reciterMatcher } from './matchers';

describe('Reciter Routes', () => {
  describe('GET /reciters - get all reciters', () => {
    test('should return all reciters', async () => {
      const res = await request.get(`${BASE_URL}/reciters`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.message).toBe('string');
      expect(Array.isArray(res.body.data)).toBe(true);

      const reciter = res.body.data[0];
      expect(reciter).toMatchObject(reciterMatcher);
    });
  });

  describe('GET /reciter/:id - get specific reciter', () => {
    test('should return specific reciter by ID', async () => {
      const res = await request.get(`${BASE_URL}/reciter/1`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.message).toBe('string');
      expect(typeof res.body.data).toBe('object');
      expect(res.body.data).toMatchObject(reciterMatcher);
    });

    test('should return 404 for non-existing reciter', async () => {
      const res = await request.get(`${BASE_URL}/reciter/1234`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('NOT_FOUND');
      expect(res.body.data).toBeNull();
      expect(res.body).toHaveProperty('error');
      expect(Array.isArray(res.body.error.details)).toBe(true);
    });
  });
});
