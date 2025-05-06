/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { IPreBismillah, IRawQuranAyah, IRawQuranAyahTranslation, IRawQuranSurah, IRawQuranSurahTranslation } from '../../_utils/interfaces';
import { constants } from '../constants';

export const utUnicodeEscapeCharacter = (text: string) => {
  return text.split('').map((char) => `\\u${('0000' + char.charCodeAt(0).toString(16)).slice(-4)}`).join('');
};

export const furl = async (option: { host: string; endpoint: string; }): Promise<any> => {
  const requestHeaders = {
    ...constants.requestHeaders,
    Origin: option.host,
  };

  const response = await axios({
    method: 'get',
    url: option.host + option.endpoint,
    headers: requestHeaders,
  });

  return response.data;
};

export const preBismillahStructureFormatter = (response: any): IPreBismillah[] => [{
  text: utUnicodeEscapeCharacter(response.deprecatedEndpoint.data.preBismillah.text.ar) as string,
  translation: response.deprecatedEndpoint.data.preBismillah.translation.id as string,
  transliteration: response.deprecatedEndpoint.data.preBismillah.text.read as string,
}, {
  text: utUnicodeEscapeCharacter(response.deprecatedEndpoint.data.preBismillah.text.ar) as string,
  translation: response.deprecatedEndpoint.data.preBismillah.translation.en as string,
  transliteration: response.deprecatedEndpoint.data.preBismillah.text.read as string,
}];

export const ayahStructureFormatter = (response: any): [{ surah: number; ayah: IRawQuranAyah[]; }, { surah: number; ayah: IRawQuranAyahTranslation[]; }[]] => [{
  surah: response.deprecatedEndpoint.data.number as number,
  ayah: response.deprecatedEndpoint.data.ayahs.map((data: any, sequence: number) => ({
    sequence: {
      quran: response.alquranCloud.data[0].ayahs[sequence].number as number,
      surah: response.alquranCloud.data[0].ayahs[sequence].numberInSurah as number,
    },
    juz: response.alquranCloud.data[0].ayahs[sequence].juz as number,
    manzil: response.alquranCloud.data[0].ayahs[sequence].manzil as number,
    page: response.alquranCloud.data[0].ayahs[sequence].page as number,
    ruku: response.alquranCloud.data[0].ayahs[sequence].ruku as number,
    hizb: response.alquranCloud.data[0].ayahs[sequence].hizbQuarter as number,
    sajda: response.alquranCloud.data[0].ayahs[sequence].sajda
      ? {
        recommended: response.alquranCloud.data[0].ayahs[sequence].sajda.recommended as string,
        obligatory: response.alquranCloud.data[0].ayahs[sequence].sajda.obligatory as string,
      }
      : false,
    text: utUnicodeEscapeCharacter(data.text.ar),
  })) as IRawQuranAyah[],
}, [{
  surah: response.deprecatedEndpoint.data.number as number,
  ayah: response.deprecatedEndpoint.data.ayahs.map((data: any, sequence: number) => ({
    sequence: {
      quran: response.alquranCloud.data[0].ayahs[sequence].number as number,
      surah: response.alquranCloud.data[0].ayahs[sequence].numberInSurah as number,
    },
    transliteration: response.ministryOfReligionID.data[sequence].latin,
    translation: response.alquranCloud.data[1].ayahs[sequence].text,
    tafsir: null,
  })),
}, {
  surah: response.deprecatedEndpoint.data.number as number,
  ayah: response.deprecatedEndpoint.data.ayahs.map((data: any, sequence: number) => ({
    sequence: {
      quran: response.alquranCloud.data[0].ayahs[sequence].number as number,
      surah: response.alquranCloud.data[0].ayahs[sequence].numberInSurah as number,
    },
    transliteration: data.text.read,
    translation: response.alquranCloud.data[0].ayahs[sequence].text,
    tafsir: null,
  })),
}]];

export const surahStructureFormatter = (response: any): [IRawQuranSurah, IRawQuranSurahTranslation[]] => [{
  sequence: response.deprecatedEndpoint.data.number as number,
  ayahCount: response.deprecatedEndpoint.data.ayahCount as number,
  type: {
    arabic: utUnicodeEscapeCharacter(response.deprecatedEndpoint.data.type.ar as string),
  },
  name: {
    arabic: {
      long: utUnicodeEscapeCharacter(response.deprecatedEndpoint.data.asma.ar.long as string),
      short: utUnicodeEscapeCharacter(response.deprecatedEndpoint.data.asma.ar.short as string),
    },
  },
}, [
  {
    sequence: response.deprecatedEndpoint.data.number as number,
    type: {
      latin: response.deprecatedEndpoint.data.type.id as string,
    },
    name: {
      latin: {
        long: response.deprecatedEndpoint.data.asma.id.long as string,
        short: response.deprecatedEndpoint.data.asma.id.short as string,
      },
    },
    translation: response.deprecatedEndpoint.data.asma.translation.id as string,
    tafsir: null,
  },
  {
    sequence: response.deprecatedEndpoint.data.number as number,
    type: {
      latin: response.deprecatedEndpoint.data.type.en as string,
    },
    name: {
      latin: {
        long: response.deprecatedEndpoint.data.asma.en.long as string,
        short: response.deprecatedEndpoint.data.asma.en.short as string,
      },
    },
    translation: response.deprecatedEndpoint.data.asma.translation.en as string,
    tafsir: null,
  },
]];
