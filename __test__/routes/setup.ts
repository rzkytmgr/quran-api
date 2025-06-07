import supertest, { SuperTest } from 'supertest';
import app from '../../src/_server/app';

const BASE_URL = '/api/v1';
const request = supertest(app);

export { BASE_URL, request };
