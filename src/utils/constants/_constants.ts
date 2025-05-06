import dotenv from 'dotenv';
import { IConstants } from 'src/interfaces/_interfaces';

dotenv.config();
const constants: IConstants = {
  APP_HOST: process.env.APP_HOST as string,
  APP_PORT: process.env.APP_PORT as string,
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_RECITER: 25,
  META_SURAH_COUNT: 114,
  META_AYAH_COUNT: 6236,
  META_RECITER_LIST: [],
  META_AVAILABLE_LANGUAGE: [],
  MESSAGE_DATA_RETRIEVED: 'Data Retrieved Successfully',
  MESSAGE_RECITER_NOT_FOUND: 'We cannot find the reciter',
  MESSAGE_LANGUAGE_NOT_FOUND: 'We cannot find data based on language you entered',
  MESSAGE_PAGE_WELCOME: `Installation and how to use the API can be checked in the documentation <a target="_blank" href="${process.env.APP_DOCUMENTATION}">rzkytmgr/quran-api</a>`,
  MESSAGE_PAGE_NOT_FOUND: '404 - <a href="/">Back home</a>',
  SERVICE_URL: {
    EVERYAYAH: 'https://everyayah.com',
    QURANICAUDIO: 'https://download.quranicaudio.com',
  },
  NOT_CACHED_PATH: [
    '/api/v1/ayah/random',
  ],
};

export { constants };
