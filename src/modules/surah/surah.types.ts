interface IPreBismillah {
  text: string;
  translation: string;
  transliteration: string;
}

interface IRawQuranSurah {
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

interface IRawQuranSurahTranslation {
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

interface IQuranSurah extends IRawQuranSurah, IRawQuranSurahTranslation {
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
  recitation?: {
    audio: string;
  };
  ayah?: Array<unknown>;
}

export { IPreBismillah, IRawQuranSurah, IRawQuranSurahTranslation, IQuranSurah };
