import fs from 'node:fs';
import path from 'node:path';

/** This function used for resolve JSON file with imutable behaviour */
const jsonResolver = async <T>(filename: string | string[]): Promise<T> => {
  const filePath = path.resolve('src', 'db', `${Array.isArray(filename) ? filename.join('/') : filename}.db.json`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as T;
};

export { jsonResolver };
