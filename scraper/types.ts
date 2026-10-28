export interface IRawQuranAyah {
  sequence: {
    quran: number;
    surah: number;
  };
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizb: number;
  sajda:
    | boolean
    | {
        recommended: string;
        obligatory: string;
      };
  text: string;
}

export interface IRawQuranAyahTranslation {
  sequence: {
    quran: number;
    surah: number;
  };
  transliteration: string;
  translation: string;
  tafsir: null | string;
}

export interface IRawQuranSurah {
  sequence: number;
  ayahCount: number;
  type: {
    arabic: string;
  };
  name: {
    arabic: {
      short: string;
      long: string;
    };
  };
}

export interface IRawQuranSurahTranslation {
  sequence: number;
  type: {
    latin: string;
  };
  name: {
    latin: {
      short: string;
      long: string;
    };
  };
  translation: string;
  tafsir: string | null;
}

export interface IPreBismillah {
  text: string;
  translation: string;
  transliteration: string;
}

export interface IAlQuranCloudAyah {
  number: number;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda:
    | false
    | {
        recommended: string;
        obligatory: string;
      };
  text: string;
}

export interface IAlQuranCloudEdition {
  ayahs: IAlQuranCloudAyah[];
}

export interface IAlQuranCloudResponse {
  data: IAlQuranCloudEdition[];
}

export interface IQuranEndpointAyah {
  text: {
    ar: string;
    read: string;
  };
}

export interface IQuranEndpointSurah {
  number: number;
  ayahCount: number;
  type: {
    ar: string;
    id: string;
    en: string;
  };
  asma: {
    ar: {
      long: string;
      short: string;
    };
    id: {
      long: string;
      short: string;
    };
    en: {
      long: string;
      short: string;
    };
    translation: {
      id: string;
      en: string;
    };
  };
  ayahs: IQuranEndpointAyah[];
  preBismillah?: {
    text: {
      ar: string;
      read: string;
    };
    translation: {
      id: string;
      en: string;
    };
  };
}

export interface IQuranEndpointResponse {
  data: IQuranEndpointSurah;
}

export interface IMinistryOfReligionAyah {
  latin: string;
}

export interface IMinistryOfReligionResponse {
  data: IMinistryOfReligionAyah[];
}

export interface ISourceResponses {
  alquranCloud: IAlQuranCloudResponse;
  quranEndpoint: IQuranEndpointResponse;
  ministryOfReligion: IMinistryOfReligionResponse;
}

export interface ISurahFormatResult {
  text: IRawQuranSurah;
  translations: {
    id: IRawQuranSurahTranslation;
    en: IRawQuranSurahTranslation;
  };
}

export interface ISurahAyahTextResult {
  surah: number;
  ayah: IRawQuranAyah[];
}

export interface ISurahAyahTranslationResult {
  surah: number;
  ayah: IRawQuranAyahTranslation[];
}

export interface IAyahsFormatResult {
  text: ISurahAyahTextResult;
  translations: {
    id: ISurahAyahTranslationResult;
    en: ISurahAyahTranslationResult;
  };
}

export interface IPreBismillahTranslations {
  id: IPreBismillah;
  en: IPreBismillah;
}

export interface ISurahCrawlResult {
  surah: ISurahFormatResult;
  ayahs: IAyahsFormatResult;
  preBismillah: IPreBismillahTranslations | null;
}
