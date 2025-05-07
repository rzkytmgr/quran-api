import { aggregator, jsonResolver, padNumber, } from '../utils/_utils.js';
import { constants } from '../utils/constants/_constants.js';
import { getSpesificSurahAyahService } from './ayah.services.js';
import { getSpesificReciterService } from './reciter.services.js';
const getEntireSurahService = async (lang, reciter) => {
    const getQuranEntireSurah = await jsonResolver('EntireQuranSurah');
    const getQuranEntireSurahTranslation = await jsonResolver(['_translation', 'lang', lang, 'EntireQuranSurahTranslation']);
    const getSurahPreBismillah = await jsonResolver(['_translation', 'lang', lang, 'PreBismillah']);
    const getSpesificReciter = await getSpesificReciterService(reciter);
    const quranEntireSurah = aggregator(getQuranEntireSurah, getQuranEntireSurahTranslation).map((value) => ({
        ...value,
        preBismillah: value.sequence === 9 ? false : getSurahPreBismillah,
        recitation: {
            audio: `${constants.SERVICE_URL.QURANICAUDIO}${getSpesificReciter?.folder.surah}${padNumber(value.sequence, 3)}.mp3`,
        },
    }));
    return quranEntireSurah;
};
const getSpesificSurahService = async (surahSequence, lang, reciter) => {
    const getQuranEntireSurah = await getEntireSurahService(lang, reciter);
    const getSpesificSurah = getQuranEntireSurah.find((quranSurah) => quranSurah.sequence === surahSequence);
    const getSpesificQuranSurahAyah = await getSpesificSurahAyahService(surahSequence, lang, reciter);
    const formattedSurah = {
        ...getSpesificSurah,
        ayah: getSpesificQuranSurahAyah,
    };
    return formattedSurah;
};
export { getEntireSurahService, getSpesificSurahService, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyYWguc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvc3VyYWguc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxHQUNWLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU92RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvRCxNQUFNLHFCQUFxQixHQUFHLEtBQUssRUFBRSxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDcEUsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLFlBQVksQ0FBbUIsa0JBQWtCLENBQUMsQ0FBQztJQUNyRixNQUFNLDhCQUE4QixHQUFHLE1BQU0sWUFBWSxDQUE4QixDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLDZCQUE2QixDQUFDLENBQUMsQ0FBQztJQUN0SixNQUFNLG9CQUFvQixHQUFHLE1BQU0sWUFBWSxDQUFnQixDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDL0csTUFBTSxrQkFBa0IsR0FBRyxNQUFNLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXBFLE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFnQixtQkFBbUIsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0SCxHQUFHLEtBQUs7UUFDUixZQUFZLEVBQUUsS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsb0JBQW9CO1FBQ2pFLFVBQVUsRUFBRTtZQUNWLEtBQUssRUFBRSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU07U0FDckg7S0FDRixDQUFDLENBQUMsQ0FBQztJQUVKLE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSx1QkFBdUIsR0FBRyxLQUFLLEVBQUUsYUFBcUIsRUFBRSxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDN0YsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLHFCQUFxQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RSxNQUFNLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQWdCLENBQUM7SUFDeEgsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLDJCQUEyQixDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEcsTUFBTSxjQUFjLEdBQUc7UUFDckIsR0FBRyxnQkFBZ0I7UUFDbkIsSUFBSSxFQUFFLHlCQUF5QjtLQUNoQyxDQUFDO0lBQ0YsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsT0FBTyxFQUNMLHFCQUFxQixFQUNyQix1QkFBdUIsR0FDeEIsQ0FBQyJ9