import yoctoSpinner from 'yocto-spinner';
import { clearProgress, getCompletedSurahNumbers, loadSurahProgress, saveSurahProgress } from './checkpoint';
import { DEFAULT_CONCURRENCY, DEFAULT_OUTPUT_DIR, TOTAL_SURAH } from './config';
import { fetchSurahAyahsFromMinistryOfReligion, fetchSurahFromAlquranCloud, fetchSurahFromQuranEndpoint } from './fetch-sources';
import { formatAyahs } from './formatters/ayah';
import { formatPreBismillah } from './formatters/pre-bismillah';
import { formatSurah } from './formatters/surah';
import type {
  IAlQuranCloudResponse,
  IMinistryOfReligionResponse,
  IPreBismillahTranslations,
  IQuranEndpointResponse,
  IRawQuranSurah,
  IRawQuranSurahTranslation,
  ISourceResponses,
  ISurahAyahTextResult,
  ISurahAyahTranslationResult,
  ISurahCrawlResult,
} from './types';
import { IDbFileSpec } from './writer';
import { validateCrawlResults } from './validator';
import { writeDatabaseFiles } from './writer';

interface ICrawlerOptions {
  concurrency: number;
  outputDir: string;
  dryRun: boolean;
  forceRestart: boolean;
}

const readOptionsFromArgv = (arguments_: string[]): ICrawlerOptions => {
  const options: ICrawlerOptions = {
    concurrency: DEFAULT_CONCURRENCY,
    outputDir: DEFAULT_OUTPUT_DIR,
    dryRun: false,
    forceRestart: false,
  };

  for (const argument of arguments_) {
    if (argument.startsWith('--concurrency=')) {
      const concurrency = Number(argument.split('=')[1]);
      if (!Number.isInteger(concurrency) || concurrency < 1) {
        throw new Error(`--concurrency must be a whole number of at least 1 (argument '${argument}')`);
      }
      options.concurrency = concurrency;
    } else if (argument.startsWith('--out=')) {
      const outputDir = argument.split('=').slice(1).join('=');
      if (!outputDir) {
        throw new Error(`--out must be filled with a directory (argument '${argument}')`);
      }
      options.outputDir = outputDir;
    } else if (argument === '--dry-run') {
      options.dryRun = true;
    } else if (argument === '--force') {
      options.forceRestart = true;
    } else {
      throw new Error(`unrecognized option: '${argument}' (valid options: --concurrency=, --out=, --dry-run, --force)`);
    }
  }

  return options;
};

const crawlSurah = async (surahNumber: number): Promise<ISurahCrawlResult> => {
  const alquranCloud: IAlQuranCloudResponse = await fetchSurahFromAlquranCloud(surahNumber);
  const quranEndpoint: IQuranEndpointResponse = await fetchSurahFromQuranEndpoint(surahNumber);
  const ministryOfReligion: IMinistryOfReligionResponse = await fetchSurahAyahsFromMinistryOfReligion(surahNumber);

  const responses: ISourceResponses = { alquranCloud, quranEndpoint, ministryOfReligion };

  return {
    surah: formatSurah(responses),
    ayahs: formatAyahs(responses),
    preBismillah: formatPreBismillah(quranEndpoint.data),
  };
};

const crawlRemainingSurahs = async (surahNumbers: number[], concurrency: number, onSurahCrawled: (crawlResult: ISurahCrawlResult, surahNumber: number) => void): Promise<void> => {
  let nextQueueIndex = 0;
  let failureError: unknown;

  const workerCount = Math.min(concurrency, surahNumbers.length);
  const workers = Array.from({ length: workerCount }, async () => {
    while (!failureError && nextQueueIndex < surahNumbers.length) {
      const surahNumber = surahNumbers[nextQueueIndex]!;
      nextQueueIndex += 1;

      try {
        const crawlResult = await crawlSurah(surahNumber);
        await saveSurahProgress(surahNumber, crawlResult);
        onSurahCrawled(crawlResult, surahNumber);
      } catch (error: unknown) {
        failureError ??= error;
      }
    }
  });

  await Promise.all(workers);

  if (failureError) {
    throw failureError;
  }
};

const buildDbFileSpecs = (crawlResults: Array<ISurahCrawlResult | undefined>): IDbFileSpec[] => {
  const surahTexts: IRawQuranSurah[] = [];
  const ayahTexts: ISurahAyahTextResult[] = [];
  const surahTranslations: { id: IRawQuranSurahTranslation[]; en: IRawQuranSurahTranslation[] } = { id: [], en: [] };
  const ayahTranslations: { id: ISurahAyahTranslationResult[]; en: ISurahAyahTranslationResult[] } = { id: [], en: [] };
  let preBismillah: IPreBismillahTranslations | undefined;

  for (const crawlResult of crawlResults) {
    if (!crawlResult) {
      continue;
    }

    surahTexts.push(crawlResult.surah.text);
    surahTranslations.id.push(crawlResult.surah.translations.id);
    surahTranslations.en.push(crawlResult.surah.translations.en);
    ayahTexts.push(crawlResult.ayahs.text);
    ayahTranslations.id.push(crawlResult.ayahs.translations.id);
    ayahTranslations.en.push(crawlResult.ayahs.translations.en);
    if (!preBismillah && crawlResult.preBismillah) {
      preBismillah = crawlResult.preBismillah;
    }
  }

  if (!preBismillah) {
    throw new Error('pre-bismillah not found — validation should have reported this first');
  }

  return [
    { directories: [], languageFolder: null, filename: 'entire-quran-surah.db.json', data: surahTexts },
    { directories: [], languageFolder: null, filename: 'entire-quran-ayah.db.json', data: ayahTexts },
    { directories: ['translation', 'lang'], languageFolder: 'en', filename: 'entire-quran-surah-translation.db.json', data: surahTranslations.en },
    { directories: ['translation', 'lang'], languageFolder: 'en', filename: 'entire-quran-ayah-translation.db.json', data: ayahTranslations.en },
    { directories: ['translation', 'lang'], languageFolder: 'id', filename: 'entire-quran-surah-translation.db.json', data: surahTranslations.id },
    { directories: ['translation', 'lang'], languageFolder: 'id', filename: 'entire-quran-ayah-translation.db.json', data: ayahTranslations.id },
    { directories: ['translation', 'lang'], languageFolder: 'id', filename: 'pre-bismillah.db.json', data: preBismillah.id },
    { directories: ['translation', 'lang'], languageFolder: 'en', filename: 'pre-bismillah.db.json', data: preBismillah.en },
  ];
};

export const runCrawler = async (cliArguments: string[]): Promise<void> => {
  const options = readOptionsFromArgv(cliArguments);
  const startTimeMs = Date.now();
  const crawlerSpinner = yoctoSpinner({ text: 'Loading crawl progress' }).start();

  try {
    if (options.forceRestart) {
      await clearProgress();
    }

    const crawlResults: Array<ISurahCrawlResult | undefined> = new Array(TOTAL_SURAH);
    const completedSurahNumbers = await getCompletedSurahNumbers();
    for (const surahNumber of completedSurahNumbers) {
      const progressCrawlResult = await loadSurahProgress(surahNumber);
      if (progressCrawlResult) {
        crawlResults[surahNumber - 1] = progressCrawlResult;
      }
    }

    const surahNumbersToCrawl = Array.from({ length: TOTAL_SURAH }, (unused, surahIndex) => surahIndex + 1).filter((surahNumber) => !completedSurahNumbers.includes(surahNumber));

    if (surahNumbersToCrawl.length === 0) {
      crawlerSpinner.success(`progress loaded: all ${TOTAL_SURAH} surahs already crawled`);
    } else {
      const firstSurahNumber = surahNumbersToCrawl[0]!;
      crawlerSpinner.text = `Checking the 3 data sources with surah ${firstSurahNumber}`;

      const firstSurahCrawlResult = await crawlSurah(firstSurahNumber);
      crawlResults[firstSurahNumber - 1] = firstSurahCrawlResult;
      await saveSurahProgress(firstSurahNumber, firstSurahCrawlResult);

      const remainingSurahNumbers = surahNumbersToCrawl.slice(1);
      let finishedSurahCount = 1;
      if (remainingSurahNumbers.length > 0) {
        crawlerSpinner.text = `Crawling quran surahs (parallel ${options.concurrency})`;
        await crawlRemainingSurahs(remainingSurahNumbers, options.concurrency, (crawlResult, surahNumber) => {
          crawlResults[surahNumber - 1] = crawlResult;
          finishedSurahCount += 1;
          crawlerSpinner.text = `Crawling quran surahs: ${finishedSurahCount}/${TOTAL_SURAH} surah (parallel ${options.concurrency})`;
        });
      }
      crawlerSpinner.success(`crawling of ${surahNumbersToCrawl.length} surahs complete`);
    }

    crawlerSpinner.start('Validating the crawl results before writing');
    const validationProblems = validateCrawlResults(crawlResults);
    if (validationProblems.length > 0) {
      for (const problem of validationProblems) {
        console.error(`${problem}`);
      }
      throw new Error('validation failed — no db file written');
    }
    crawlerSpinner.success('validation passed: 114 surahs, 6236 ayahs, all fields filled');

    if (options.dryRun) {
      crawlerSpinner.info(`--dry-run: db files not written (duration ${Date.now() - startTimeMs}ms)`);
      return;
    }

    crawlerSpinner.start(`Writing the db files into '${options.outputDir}'`);
    const writtenFilePaths = await writeDatabaseFiles(options.outputDir, buildDbFileSpecs(crawlResults));
    await clearProgress();

    const durationSeconds = ((Date.now() - startTimeMs) / 1000).toFixed(1);
    crawlerSpinner.success(`${writtenFilePaths.length} db files written to '${options.outputDir}' (duration ${durationSeconds}s)`);
  } catch (error: unknown) {
    if (crawlerSpinner.isSpinning) {
      crawlerSpinner.stop();
    }
    throw error;
  }
};
