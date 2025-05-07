import { getEntireSurahService, getSpesificSurahService, } from '../../../../services/surah.services.js';
import { ErrorHandler } from '../../../../libraries/errors/_errors.js';
const getEntireSurahController = async (req, res, next) => {
    const getEntireSurah = await getEntireSurahService(req.query.lang, req.query.reciter);
    return res.status(200).json({
        success: true,
        message: req.ext.constants.MESSAGE_DATA_RETRIEVED,
        data: getEntireSurah,
    });
};
const getSpesificSurahController = async (req, res, next) => {
    const getSpesificSurah = await getSpesificSurahService(req.params.surah, req.query.lang, req.query.reciter);
    if (!getSpesificSurah) {
        throw new ErrorHandler({
            code: 404,
            details: [{
                    path: ['surah'],
                    message: `We cannot find surah sequence '${req.params.surah}'.`,
                }],
            message: 'NOT_FOUND',
        });
    }
    return res.status(200).json({
        success: true,
        message: req.ext.constants.MESSAGE_DATA_RETRIEVED,
        data: getSpesificSurah,
    });
};
const getSpesificSurahAyahController = async (req, res, next) => {
    const getSpesificSurah = await getSpesificSurahService(req.params.surah, req.query.lang, req.query.reciter);
    if (!getSpesificSurah) {
        throw new ErrorHandler({
            code: 404,
            details: [{
                    path: ['surah'],
                    message: `We cannot find surah sequence '${req.params.surah}'.`,
                }],
            message: 'NOT_FOUND',
        });
    }
    const getSpesificAyahSurah = new Map(getSpesificSurah.ayah.map((ayah) => [ayah.sequence.surah, ayah])).get(req.params.ayah);
    if (!getSpesificAyahSurah) {
        throw new ErrorHandler({
            code: 404,
            details: [{
                    path: ['ayah'],
                    message: `We cannot find ayah sequence '${req.params.ayah}' in surah '${req.params.surah}'.`,
                }],
            message: 'NOT_FOUND',
        });
    }
    const surahFormatted = {
        ...getSpesificSurah,
        ayah: getSpesificAyahSurah,
    };
    return res.status(200).json({
        success: true,
        message: req.ext.constants.MESSAGE_DATA_RETRIEVED,
        data: surahFormatted,
    });
};
export { getEntireSurahController, getSpesificSurahAyahController, getSpesificSurahController, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyYWguY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvX3NlcnZlci9hcGkvdjEvY29udHJvbGxlcnMvc3VyYWguY29udHJvbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHFCQUFxQixFQUNyQix1QkFBdUIsR0FDeEIsTUFBTSx5QkFBeUIsQ0FBQztBQU1qQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDekYsTUFBTSxjQUFjLEdBQUcsTUFBTSxxQkFBcUIsQ0FDaEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUF5QixFQUNuQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQTRCLENBQ3ZDLENBQUM7SUFFRixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLHNCQUFzQjtRQUNqRCxJQUFJLEVBQUUsY0FBYztLQUNyQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixNQUFNLDBCQUEwQixHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMzRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sdUJBQXVCLENBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBMEIsRUFDckMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUF5QixFQUNuQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQTRCLENBQ3ZDLENBQUM7SUFFRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN0QixNQUFNLElBQUksWUFBWSxDQUFDO1lBQ3JCLElB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