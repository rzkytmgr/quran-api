const express = require('express');
const router = express.Router();
const middleware = require('./middleware');
const { homeController, imamController, quranController } = require('./controller');
require('dotenv').config();

router.get('/', middleware, homeController);
router.get('/imam', middleware, imamController);
router.get('/imam/:id', middleware, imamController);
router.get('/quran', middleware, quranController);
router.get('/quran/:surah', middleware, quranController);
router.get('/quran/:surah/:ayah', middleware, quranController);

router.get('*', (req, res, next) => res.status(404).json({ status: 404, message: 'nothing here!' }));

module.exports = router;
