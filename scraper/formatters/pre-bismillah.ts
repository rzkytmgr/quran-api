import { toUnicodeEscapeSequence } from './unicode';
import { IPreBismillahTranslations, IQuranEndpointSurah } from '../types';

export const formatPreBismillah = (quranEndpointSurah: IQuranEndpointSurah): IPreBismillahTranslations | null => {
  const preBismillah = quranEndpointSurah.preBismillah;
  if (!preBismillah) {
    return null;
  }

  const arabicText = toUnicodeEscapeSequence(preBismillah.text.ar);
  const transliteration = preBismillah.text.read;

  return {
    id: { text: arabicText, translation: preBismillah.translation.id, transliteration },
    en: { text: arabicText, translation: preBismillah.translation.en, transliteration },
  };
};
