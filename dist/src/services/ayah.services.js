import { aggregator, jsonResolver, padNumber, } from '../utils/_utils.js';
import { constants } from '../utils/constants/_constants.js';
import { getSpesificReciterService } from './reciter.services.js';
const getEntireAyahService = async () => {
    const getQuranEntireAyah = await jsonResolver('EntireQuranAyah');
    return getQuranEntireAyah;
};
const getEntireFlatAyahService = async () => {
    const getQuranEntireAyah = await getEntireAyahService();
    const flattingAyah = (item) => item.ayah.map((value) => ({
        ...value,
        surah: item.surah,
    }));
    return new Map(getQuranEntireAyah.flatMap(flattingAyah).map((item) => [item.sequence.quran, item]));
};
const getEntireFlatAyahTranslationService = async (lang) => {
    const getQuranEntireAyahTranslation = await jsonResolver(['_translation', 'lang', lang, 'EntireQuranAyahTranslation']);
    const flattingAyah = (item) => item.ayah.map((value) => ({
        ...value,
        surah: item.surah,
    }));
    return new Map(getQuranEntireAyahTranslation.flatMap(flattingAyah).map((item) => [item.sequence.quran, item]));
};
const getSpesificAyahService = async (ayahSequence, lang, reciter) => {
    const getQuranEntireAyah = await getEntireFlatAyahService();
    const getQuranEntireAyahTranslation = await getEntireFlatAyahTranslationService(lang);
    const getSpesificReciter = await getSpesificReciterService(reciter);
    const getSpesificQuranSurahAyah = getQuranEntireAyah.get(ayahSequence);
    const getSpesificQuranSurahAyahTranslation = getQuranEntireAyahTranslation.get(ayahSequence);
    const formattedAyah = aggregator(getSpesificQuranSurahAyah, getSpesificQuranSurahAyahTranslation);
    formattedAyah.recitation = {
        audio: `${constants.SERVICE_URL.EVERYAYAH}${getSpesificReciter?.folder.ayah}${padNumber(formattedAyah.surah, 3)}${padNumber(formattedAyah.sequence.surah, 3)}.mp3`,
    };
    return formattedAyah;
};
const getSpesificSurahAyahService = async (surahSequence, lang, reciter) => {
    const getQuranEntireAyah = await getEntireAyahService();
    const getQuranEntireAyahTranslation = await jsonResolver(['_translation', 'lang', lang, 'EntireQuranAyahTranslation']);
    const getSpesificReciter = await getSpesificReciterService(reciter);
    const getSpesificQuranSurahAyah = new Map(getQuranEntireAyah.map((ayah) => [ayah.surah, ayah.ayah])).get(surahSequence);
    const getSpesificQuranSurahAyahTranslation = new Map(getQuranEntireAyahTranslation.map((translation) => [translation.surah, translation.ayah])).get(surahSequence);
    const formattedAyah = aggregator(getSpesificQuranSurahAyah, getSpesificQuranSurahAyahTranslation).map((value) => ({
        ...value,
        recitation: {
            audio: `${constants.SERVICE_URL.EVERYAYAH}${getSpesificReciter?.folder.ayah}${padNumber(surahSequence, 3)}${padNumber(value.sequence.surah, 3)}.mp3`,
        },
    }));
    return formattedAyah;
};
export { getEntireAyahService, getSpesificAyahService, getSpesificSurahAyahService, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXlhaC5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9heWFoLnNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsR0FDVixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFL0QsTUFBTSxvQkFBb0IsR0FBRyxLQUFLLElBQUksRUFBRTtJQUN0QyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sWUFBWSxDQUE4QyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzlHLE9BQU8sa0JBQWtCLENBQUM7QUFDNUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLElBQUksRUFBRTtJQUMxQyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sb0JBQW9CLEVBQUUsQ0FBQztJQUV4RCxNQUFNLFlBQVksR0FBRyxDQUFDLElBQStDLEVBQUUsRUFBRSxDQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QixHQUFHLEtBQUs7UUFDUixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7S0FDbEIsQ0FBQyxDQUFDLENBQUM7SUFFTixPQUFPLElBQUksR0FBRyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RHLENBQUMsQ0FBQztBQUVGLE1BQU0sbUNBQW1DLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBRSxFQUFFO0lBQ2pFLE1BQU0s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