import { describe, expect, test } from 'vitest';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);
const BASE_URL = '/api/v1';

describe('Api v1 Reciter Routes (new app)', () => {
  test('GET /reciters returns all reciters', async () => {
    const res = await request.get(`${BASE_URL}/reciters`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Reciters retrieved successfully');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toHaveLength(32);
    expect(res.body.data[0]).toMatchObject({ id: 1, name: expect.any(String) });
  });

  test('GET /reciter/:id returns specific reciter', async () => {
    const res = await request.get(`${BASE_URL}/reciter/25`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Reciter retrieved successfully');
    expect(res.body.data).toMatchObject({ id: 25, name: 'Yasser Ad-Dosari' });
  });

  test('GET /reciter/:id returns contract-compliant 404 for unknown reciter', async () => {
    const res = await request.get(`${BASE_URL}/reciter/1234`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('NOT_FOUND');
    expect(res.body.data).toBeNull();
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });
});
