#!/usr/bin/env node
/**
 * CLI entrypoint of the quran crawler.
 *
 * This file is a thin launcher: CLI arguments are forwarded as-is to
 * `runCrawler` in the crawler module, then the error is translated into a
 * process failure code. Use `tsx` to load the TypeScript source directly
 * without distribution in the build.
 *
 * Usage:
 *   node bin/scraper.mjs [--concurrency=N] [--out=DIR] [--dry-run] [--force]
 */
import { tsImport } from 'tsx/esm/api';

try {
  const crawler = await tsImport('../scraper/crawler.ts', import.meta.url);
  await crawler.runCrawler(process.argv.slice(2));
} catch (error) {
  console.error(`crawling failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
