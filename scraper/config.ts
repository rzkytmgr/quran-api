export const SOURCE_URLS = {
  alquranCloud: 'https://api.alquran.cloud',
  quranEndpoint: 'https://quran-endpoint.vercel.app',
  ministryOfReligion: 'https://web-api.qurankemenag.net',
} as const;

export const MINISTRY_OF_RELIGION_ORIGIN = 'https://quran.kemenag.go.id';

export const REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
} as const;

export const HTTP_CONFIG = {
  timeoutMs: 30_000,
  maxAttempts: 3,
  retryBaseDelayMs: 1_000,
} as const;

export const TOTAL_SURAH = 114;
export const TOTAL_AYAH = 6_236;

export const ALQURAN_CLOUD_EDITIONS = 'en.sahih,id.indonesian';

export const DEFAULT_CONCURRENCY = 5;
export const DEFAULT_OUTPUT_DIR = 'data';

export const SURAH_WITHOUT_PRE_BISMILLAH = new Set([1, 9]);

export const PROGRESS_DIR = '.crawler-progress';
