import { readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { PROGRESS_DIR, TOTAL_SURAH } from './config';
import type { ISurahCrawlResult } from './types';
import { writeJsonFileAtomically } from './writer';

const getSurahProgressFilePath = (surahNumber: number): string => path.resolve(PROGRESS_DIR, `surah-${surahNumber}.json`);

export const saveSurahProgress = async (surahNumber: number, crawlResult: ISurahCrawlResult): Promise<void> => {
  await writeJsonFileAtomically(getSurahProgressFilePath(surahNumber), JSON.stringify(crawlResult));
};

export const loadSurahProgress = async (surahNumber: number): Promise<ISurahCrawlResult | undefined> => {
  try {
    const progressFileContent = await readFile(getSurahProgressFilePath(surahNumber), 'utf-8');
    return JSON.parse(progressFileContent) as ISurahCrawlResult;
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return undefined;
    }
    throw error;
  }
};

export const getCompletedSurahNumbers = async (): Promise<number[]> => {
  try {
    const progressFileNames = await readdir(PROGRESS_DIR);
    return progressFileNames
      .map((fileName) => fileName.match(/^surah-(\d+)\.json$/)?.[1])
      .filter((match): match is string => match !== undefined)
      .map(Number)
      .filter((surahNumber) => surahNumber >= 1 && surahNumber <= TOTAL_SURAH)
      .sort((left, right) => left - right);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

export const clearProgress = async (): Promise<void> => {
  await rm(PROGRESS_DIR, { recursive: true, force: true });
};
