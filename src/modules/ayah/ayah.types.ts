interface IRawQuranAyah {
  sequence: {
    quran: number;
    surah: number;
  };
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizb: number;
  sajda: boolean | { recommended: string; obligatory: string };
  text: string;
}

interface IRawQuranAyahTranslation {
  sequence: {
    quran: number;
    surah: number;
  };
  transliteration: string;
  translation: string;
  tafsir: null | string;
}

interface IQuranAyah extends IRawQuranAyah, IRawQuranAyahTranslation {
  recitation?: {
    audio: string;
  };
}

interface IFlatQuranAyah extends IQuranAyah {
  surah: number;
}

export { IRawQuranAyah, IRawQuranAyahTranslation, IQuranAyah, IFlatQuranAyah };
