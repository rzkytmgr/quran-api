import { Router } from 'express';
import { Wrapper } from '../../../utils/wrapper.js';
import { validator } from '../../../middlewares/validator.js';
import {
  getRandomAyahController,
  getSpesificAyahController,
} from './controllers/ayah.controllers.js';
import {
  getEntireRecitersController,
  getSpesificReciterController,
} from './controllers/reciters.controllers.js';
import {
  getEntireSurahController,
  getSpesificSurahAyahController,
  getSpesificSurahController,
} from './controllers/surah.controllers.js';
import {
  generalQuerySchemaValidation,
  getSpesificAyahPathSchemaValidation,
  getSpesificReciterPathSchemaValidation,
  getSpesificSurahAyahPathSchemaValidation,
  getSpesificSurahPathSchemaValidation,
} from '../../../libraries/validators/schema.js';
const router = Router();
router.get('/reciters', Wrapper(getEntireRecitersController));
router.get('/reciter/:reciter(\\d+)', validator([getSpesificReciterPathSchemaValidation]), Wrapper(getSpesificReciterController));
router.get('/surah', validator([generalQuerySchemaValidation]), Wrapper(getEntireSurahController));
router.get('/surah/:surah(\\d+)', validator([generalQuerySchemaValidation, getSpesificSurahPathSchemaValidation]), Wrapper(getSpesificSurahController));
router.get('/surah/:surah(\\d+)/ayah/:ayah(\\d+)', validator([generalQuerySchemaValidation, getSpesificSurahAyahPathSchemaValidation]), Wrapper(getSpesificSurahAyahController));
router.get('/ayah/:ayah(\\d+)', validator([generalQuerySchemaValidation, getSpesificAyahPathSchemaValidation]), Wrapper(getSpesificAyahController));
router.get('/ayah/random', validator([generalQuerySchemaValidation]), Wrapper(getRandomAyahController));
export { router };
// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3JvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9fc2VydmVyL2FwaS92MS9fcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qix5QkFBeUIsR0FDMUIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLDRCQUE0QixHQUM3QixNQUFNLDBDQUEwQyxDQUFDO0FBQ2xELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLDBCQUEwQixHQUMzQixNQUFNLHVDQUF1QyxDQUFDO0FBQy9DLE9BQU8sRUFDTCw0QkFBNEIsRUFDNUIsbUNBQW1DLEVBQ25DLHNDQUFzQyxFQUN0Qyx3Q0FBd0MsRUFDeEMsb0NBQW9DLEdBQ3JDLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztBQUM5RCxNQUFNLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLFNBQVMsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0FBRWxJLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO0FBQ25HLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLENBQUMsNEJBQTRCLEVBQUUsb0NBQW9DLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFDeEosTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxTQUFTLENBQUMsQ0FBQyw0QkFBNEIsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztBQUVqTCxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDLDRCQUE0QixFQUFFLG1DQUFtQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0FBQ3BKLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO0FBRXhHLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyJ9
