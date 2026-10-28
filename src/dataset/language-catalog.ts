import fs from 'node:fs';
import path from 'node:path';
import { appConfig } from '../config/app-config';

let languages: string[] | undefined;

const getAvailableLanguages = (): string[] => {
  languages ??= fs.readdirSync(path.resolve(appConfig.datasetDirectory, 'translation', 'lang'));
  return languages;
};

export { getAvailableLanguages };
