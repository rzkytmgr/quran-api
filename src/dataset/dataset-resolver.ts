import fs from 'node:fs';
import path from 'node:path';
import { appConfig } from '@config/app-config';

const datasetCache = new Map<string, unknown>();

const readDataset = <T>(filename: string | string[]): T => {
  const filePath = path.resolve(appConfig.datasetDirectory, `${Array.isArray(filename) ? filename.join('/') : filename}.db.json`);
  let dataset = datasetCache.get(filePath);
  if (dataset === undefined) {
    dataset = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as unknown;
    datasetCache.set(filePath, dataset);
  }
  return dataset as T;
};

export { readDataset };
