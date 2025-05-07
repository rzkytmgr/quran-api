import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** This function used for resolve JSON file with imutable behaviour */
const jsonResolver = async <T>(filename: string | string[]): Promise<T> => {
  const filePath = path.resolve('src', 'db', `${Array.isArray(filename) ? filename.join('/') : filename}.db.json`);
  const fileUrl = pathToFileURL(filePath);

  const data = await import(fileUrl.href, {
    assert: { type: 'json' },
  });

  return data.default;
};

export { jsonResolver };
