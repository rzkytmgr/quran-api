const express = require("express");
const router = express.Router();
require("dotenv").config();
const caching = require("./middleware");
const { homeController, imamController, quranController } = require("./controller");

router.get("/", homeController);
router.get("/imam", imamController);
router.get("/imam/:id", imamController);
router.get("/quran", quranController);
router.get("/quran/:surah", quranController);
router.get("/quran/:surah/:ayah", quranController);

router.get("*", (req, res, next) => res.status(404).json({ status: 404, message: "not poun" }));

module.exports = router;
