const express = require('express');
const router = express.Router();
const middleware = require('./middleware');
const { homeController, imamController, quranController } = require('./controller');
require('dotenv').config();

router.use(middleware);
router.get('/', homeController);
router.get('/imam', imamController);
router.get('/imam/:id', imamController);
router.get('/quran', quranController);
router.get('/quran/:surah', quranController);
router.get('/quran/:surah/:ayah', quranController);

router.get('*', (req, res, next) => res.status(404).json({ status: 404, message: 'nothing here!' }));

module.exports = router;
