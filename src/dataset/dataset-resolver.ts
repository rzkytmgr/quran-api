import fs from 'node:fs';
import path from 'node:path';
import { appConfig } from '@config/app-config';

const datasetCache = new Map<string, unknown>();

const datasetRoot = path.resolve(appConfig.datasetDirectory);

const resolveDatasetPath = (filename: string | string[]): string => {
  const filePath = path.resolve(datasetRoot, `${Array.isArray(filename) ? filename.join('/') : filename}.db.json`);
  if (path.relative(datasetRoot, filePath).startsWith('..') || path.isAbsolute(path.relative(datasetRoot, filePath))) {
    throw new Error(`dataset path escapes the data folder: ${filename}`);
  }
  return filePath;
};

const readDataset = <T>(filename: string | string[]): T => {
  const filePath = resolveDatasetPath(filename);
  let dataset = datasetCache.get(filePath);
  if (dataset === undefined) {
    dataset = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as unknown;
    datasetCache.set(filePath, dataset);
  }
  return dataset as T;
};

export { readDataset };
