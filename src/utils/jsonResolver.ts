import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** This function used for resolve JSON file with imutable behaviour */
const jsonResolver = async <T>(filename: string | string[]): Promise<T> => {
  const data = await import(path.resolve('src', 'db', `${Array.isArray(filename) ? filename.join('/') : filename}.db.json`), {
    assert: {
      type: 'json',
    },
  });
  return JSON.parse(JSON.stringify(data.default));
};

export { jsonResolver };
