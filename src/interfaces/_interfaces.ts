import { EValidatorType } from '@enum/_enum';
import { Logger } from 'winston';
import {
  z,
  ZodSchema,
} from 'zod';
import { IPreBismillah } from './_interfaces';

export type IReciters = Omit<IRawReciters, 'folder'>;

export interface IValidatorOptions {
  type: EValidatorType;
  schema: ZodSchema;
}

declare global {
  namespace Express {
    interface Request {
      ext: {
        logger: Logger;
        constants: IConstants;
        validator: typeof z;
      };
    }
  }
}

export interface IRawReciters {
  id: number;
  name: string;
  folder: {
    ayah: string;
    surah: string;
  };
}

export interface IQuranAyah {
  sequence: {
    quran: number;
    surah: number;
  };
  juz: number;
  manzil: number;
  page: number;
  hizb: number;
  sajda: boolean | {
    recommended: string;
    obligatory: string;
  };
  text: string;
  transliteration: string;
  translation: string;
  tafsir: null | string;
  recitation?: {
    audio: string;
  };
}

export interface IQuranSurah {
  sequence: number;
  ayahCount: number;
  type: {
    arabic: string;
    latin: string;
  };
  name: {
    arabic: {
      short: string;
      long: string;
    };
    latin: {
      short: string;
      long: string;
    };
  };
  preBismillah: boolean | IPreBismillah;
  translation: string;
  tafsir: string | null;
  recitation?: {
    audio: string;
  };
  ayah?: Array<IQuranAyah>;
}

export interface IConstants {
  APP_HOST: string;
  APP_PORT: string;
  DEFAULT_LANGUAGE: string;
  DEFAULT_RECITER: number;
  META_SURAH_COUNT: number;
  META_AYAH_COUNT: number;
  META_RECITER_LIST: Array<unknown>;
  META_AVAILABLE_LANGUAGE: Array<unknown>;
  MESSAGE_DATA_RETRIEVED: string;
  MESSAGE_RECITER_NOT_FOUND: string;
  MESSAGE_LANGUAGE_NOT_FOUND: string;
  MESSAGE_PAGE_WELCOME: string;
  MESSAGE_PAGE_NOT_FOUND: string;
  SERVICE_URL: {
    EVERYAYAH: string;
    QURANICAUDIO: string;
  };
  NOT_CACHED_PATH: string[];
}

export * from '../../_crawler/_utils/interfaces/index';
