import { Router } from 'express';
import { Wrapper } from '@util/wrapper';
import { validator } from '@middleware/validator';
import {
  getRandomAyahController,
  getSpesificAyahController,
} from '@api/v1/controllers/ayah.controllers';
import {
  getEntireRecitersController,
  getSpesificReciterController,
} from '@api/v1/controllers/reciters.controllers';
import {
  getEntireSurahController,
  getSpesificSurahAyahController,
  getSpesificSurahController,
} from '@api/v1/controllers/surah.controllers';
import {
  generalQuerySchemaValidation,
  getSpesificAyahPathSchemaValidation,
  getSpesificReciterPathSchemaValidation,
  getSpesificSurahAyahPathSchemaValidation,
  getSpesificSurahPathSchemaValidation,
} from '@lib/validators/schema';

const router = Router();

router.get('/reciters', Wrapper(getEntireRecitersController));
router.get('/reciter/:reciter(\\d+)', validator([getSpesificReciterPathSchemaValidation]), Wrapper(getSpesificReciterController));

router.get('/surah', validator([generalQuerySchemaValidation]), Wrapper(getEntireSurahController));
router.get('/surah/:surah(\\d+)', validator([generalQuerySchemaValidation, getSpesificSurahPathSchemaValidation]), Wrapper(getSpesificSurahController));
router.get('/surah/:surah(\\d+)/ayah/:ayah(\\d+)', validator([generalQuerySchemaValidation, getSpesificSurahAyahPathSchemaValidation]), Wrapper(getSpesificSurahAyahController));

router.get('/ayah/:ayah(\\d+)', validator([generalQuerySchemaValidation, getSpesificAyahPathSchemaValidation]), Wrapper(getSpesificAyahController));
router.get('/ayah/random', validator([generalQuerySchemaValidation]), Wrapper(getRandomAyahController));

export { router };
