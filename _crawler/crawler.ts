import fs from 'node:fs';
import path from 'node:path';
import yoctoSpinner from 'yocto-spinner';
import { constants } from './_libraries/constants';
import {
  ayahStructureFormatter,
  furl,
  preBismillahStructureFormatter,
  surahStructureFormatter,
} from './_libraries/function';
import {
  IPreBismillah,
  IRawQuranAyah,
  IRawQuranAyahTranslation,
  IRawQuranSurah,
  IRawQuranSurahTranslation,
} from './_utils/interfaces';

const initializeStaticDatabaseCrawler = async (): Promise<void> => {
  const spinner = yoctoSpinner().start('🕷️ • Crawling qur\'an from the listed sources');
  const NUMBER_QURAN_SURAH = 114;

  type AyahCollection = {
    collection: {
      surah: number;
      ayah: IRawQuranAyah[];
    }[];
    translation: {
      [key: string]: {
        surah: number;
        ayah: IRawQuranAyahTranslation[];
      }[];
    };
  };

  type SurahCollection = {
    collection: IRawQuranSurah[];
    translation: {
      [key: string]: IRawQuranSurahTranslation[];
    };
  };

  const preBismillahText: { [key: string]: IPreBismillah | Record<string, unknown>; } = {};

  const quranAyahCollection: AyahCollection = {
    collection: [],
    translation: {
      id: [],
      en: [],
    },
  };

  const quranSurahCollection: SurahCollection = {
    collection: [],
    translation: {
      id: [],
      en: [],
    },
  };

  spinner.info(`🚀 • Let's trying to crawl the qur'an surah!`);
  for (let sequence = 1; sequence <= NUMBER_QURAN_SURAH; sequence++) {
    spinner.start(`⏳ • Crawling qur'an surah [ ${sequence} ]`);

    const alquranCloud = await furl({
      host: constants.servicesUrl.alquranCloud,
      endpoint: `/v1/surah/${sequence}/editions/en.sahih,id.indonesian`,
    });

    const deprecatedEndpoint = await furl({
      host: constants.servicesUrl.deprecatedEndpoint,
      endpoint: `/quran/${sequence}`,
    });

    const ministryOfReligionID = await furl({
      host: constants.servicesUrl.IDMinistryOfReligion,
      endpoint: `/quran-ayah?surah=${sequence}`,
    });

    const serviceResponses = { alquranCloud, deprecatedEndpoint, ministryOfReligionID };
    const preBismillahFormatted = deprecatedEndpoint.data.preBismillah && Object.keys(preBismillahText).length === 0 ? preBismillahStructureFormatter(serviceResponses) : null;
    const surahFormatted = surahStructureFormatter(serviceResponses);
    const ayahFormatted = ayahStructureFormatter(serviceResponses);

    if (preBismillahFormatted !== null) {
      preBismillahText['id'] = preBismillahFormatted[0];
      preBismillahText['en'] = preBismillahFormatted[1];
    }

    quranSurahCollection.collection.push(surahFormatted[0]);
    Object.entries(quranSurahCollection.translation).map(([lang], index) => quranSurahCollection.translation[lang].push(surahFormatted[1][index]));

    quranAyahCollection.collection.push(ayahFormatted[0]);
    Object.entries(quranAyahCollection.translation).map(([lang], index) => quranAyahCollection.translation[lang].push(ayahFormatted[1][index]));
  }

  spinner.success(`🕺 • Ay! we're done with qur'an surah`);
  spinner.start(`📦 • Packaging the entire quran into static database`);
  const filemeta = [{
    path: [],
    lang: null,
    filename: 'EntireQuranSurah.db.json',
    data: quranSurahCollection.collection,
  }, {
    path: [],
    lang: null,
    filename: 'EntireQuranAyah.db.json',
    data: quranAyahCollection.collection,
  }, {
    path: ['_translation', 'lang'],
    lang: 'en',
    filename: 'EntireQuranSurahTranslation.db.json',
    data: quranSurahCollection.translation.en,
  }, {
    path: ['_translation', 'lang'],
    lang: 'en',
    filename: 'EntireQuranAyahTranslation.db.json',
    data: quranAyahCollection.translation.en,
  }, {
    path: ['_translation', 'lang'],
    lang: 'id',
    filename: 'EntireQuranSurahTranslation.db.json',
    data: quranSurahCollection.translation.id,
  }, {
    path: ['_translation', 'lang'],
    lang: 'id',
    filename: 'EntireQuranAyahTranslation.db.json',
    data: quranAyahCollection.translation.id,
  }, {
    path: ['_translation', 'lang'],
    lang: 'id',
    filename: 'PreBismillah.db.json',
    data: preBismillahText.id,
  }, {
    path: ['_translation', 'lang'],
    lang: 'en',
    filename: 'PreBismillah.db.json',
    data: preBismillahText.en,
  }];

  filemeta.forEach((file) => fs.writeFileSync(path.resolve('src', 'db', ...file.path, file.lang || '', file.filename), JSON.stringify(file.data).replace(/\\\\/g, '\\'), 'utf-8'));

  spinner.success('🏁 • We\'re done! qur\'an stored in src/db folder!\n');
};

initializeStaticDatabaseCrawler();
