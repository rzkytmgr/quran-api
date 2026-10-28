import path from 'node:path';

const appConfig = {
  host: process.env.APP_HOST ?? 'http://localhost',
  port: process.env.APP_PORT ?? '3000',
  datasetDirectory: path.resolve('data'),
  defaultLanguage: 'en',
  defaultReciter: 25,
  totalSurah: 114,
  totalAyah: 6236,
  message: {
    dataRetrieved: 'Data Retrieved Successfully',
    pageWelcome: `Installation and how to use the API can be checked in the documentation <a target="_blank" href="${process.env.APP_DOCUMENTATION}">rzkytmgr/quran-api</a>`,
    pageNotFound: '404 - <a href="/">Back home</a>',
  },
  serviceUrls: {
    everyayah: 'https://everyayah.com',
    quranicaudio: 'https://download.quranicaudio.com',
  },
  notCachedPaths: ['/v1/ayah/random'],
} as const;

export { appConfig };
