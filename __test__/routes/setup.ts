import supertest, { SuperTest } from 'supertest';
import { afterAll, beforeAll } from 'vitest';
import app from '../../src/_server/app';
import { Server } from 'http';

let server: Server;
let request: SuperTest;

beforeAll(() => {
  server = app.listen(0);
  // @ts-ignore
  request = supertest(app);
});

afterAll(() => {
  server.close();
});

export { request };
