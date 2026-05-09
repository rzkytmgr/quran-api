import { z } from 'zod';
import { EValidatorType } from '@enum/_enum';
import { constants } from '@util/constants/_constants';
import { IValidatorOptions } from '@interface/_interfaces';

const getSpesificReciterPathSchemaValidation: IValidatorOptions = {
  type: EValidatorType.PathParameter,
  schema: z.object({
    reciter: z.coerce.number().int().positive(),
  }),
};

const generalQuerySchemaValidation: IValidatorOptions = {
  type: EValidatorType.QueryParameter,
  schema: z.object({
    reciter: z.coerce.number().int().positive().refine((value: number) => constants.META_RECITER_LIST.includes(value), (value) => ({
      message: `We cannot find reciter with id '${value}'`,
    })).default(constants.DEFAULT_RECITER),
    lang: z.string().refine((value: string) => constants.META_AVAILABLE_LANGUAGE.includes(value), (value) => ({
      message: `We cannot find language '${value}'`,
    })).default(constants.DEFAULT_LANGUAGE),
  }),
};

const getSpesificSurahPathSchemaValidation: IValidatorOptions = {
  type: EValidatorType.PathParameter,
  schema: z.object({
    surah: z.coerce.number().int().positive(),
  }),
};

const getSpesificSurahAyahPathSchemaValidation: IValidatorOptions = {
  type: EValidatorType.PathParameter,
  schema: z.object({
    surah: z.coerce.number().int().positive(),
    ayah: z.coerce.number().int().positive(),
  }),
};

const getSpesificAyahPathSchemaValidation: IValidatorOptions = {
  type: EValidatorType.PathParameter,
  schema: z.object({
    ayah: z.coerce.number().int().positive().refine((arg) => constants.META_AYAH_COUNT >= arg, (value) => ({
      message: `We cannot find quran ayah sequence '${value}'`,
    })),
  }),
};

export {
  generalQuerySchemaValidation,
  getSpesificAyahPathSchemaValidation,
  getSpesificReciterPathSchemaValidation,
  getSpesificSurahAyahPathSchemaValidation,
  getSpesificSurahPathSchemaValidation,
};
