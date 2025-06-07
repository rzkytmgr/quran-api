import { describe, expect, test } from 'vitest';
import { request } from './setup';

describe('test get reciter routes', () => {
  describe('get entire reciters', () => {
    test('should be return entire reciters data', async () => {
      const response = await request.get('/api/v1/reciters');
      const reciter = response.body.data[0];

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBeTypeOf('string');
      expect(response.body.data).toBeTypeOf('object');
      expect(reciter).toHaveProperty('id');
      expect(reciter).toHaveProperty('name');
    });
  });
});
