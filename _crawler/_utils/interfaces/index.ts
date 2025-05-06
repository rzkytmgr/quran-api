export interface IRawQuranAyah {
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
