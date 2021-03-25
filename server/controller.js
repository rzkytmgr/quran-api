const { home, error, success, preBismillah } = require('../util/display');
const imam = require('../data/imam.json');
const quran = require('../data/quran.json');
const { numberFormatter, filterParams } = require('../util/helper');

const Controller = {
	homeController(req, res) {
		return res.status(200).json({ ...success, ...home });
	},

	imamController(req, res) {
		const { id } = req.params;
		const recitationImam = imam.map(res => {
			const { path, audioBitrate, full, ...temp } = res;
			return temp;
		});

		if (typeof id === 'undefined') {
			return res.status(200).json({ ...success, data: recitationImam });
		} else {
			const spesificImam = recitationImam[id - 1];
			return typeof spesificImam !== 'undefined' ? res.status(200).json({ ...success, data: spesificImam }) : res.status(404).json({ ...error, data: null });
		}
	},

	quranController(req, res) {
		const { surah, ayah } = req.params;
		const { imamId } = req.query;
		const recitationImam = imam[imamId - 1];

		const quranFinal = quran.map((eachSurah, index) => {
			eachSurah.preBismillah ? (eachSurah.preBismillah = { ...preBismillah }) : null;
			if (!recitationImam) return eachSurah;
			eachSurah.recitation.full = `https://download.quranicaudio.com/quran/${recitationImam.full}/${numberFormatter(index + 1)}.mp3`;
			eachSurah.ayahs.forEach((eachAyah, index) => (eachAyah.audio.url = `https://everyayah.com/data/${recitationImam.path}/${numberFormatter(eachSurah.number)}${numberFormatter(index + 1)}.mp3`));
			return eachSurah;
		});

		const spesificSurah = quranFinal[surah - 1];

		if (surah > quranFinal.length || surah < 1 || filterParams(surah)) {
			res.status(404).json({ ...error });
		} else if (typeof spesificSurah === 'undefined') {
			const finalData = quranFinal.map(res => {
				const { ayahs, ...temp } = res;
				return temp;
			});

			res.status(200).json({ ...success, data: [...finalData] });
		} else {
			if (ayah > spesificSurah.ayahs.length || ayah < 1 || filterParams(ayah)) {
				res.status(404).json({ ...error });
			} else {
				const spesificAyah = spesificSurah.ayahs[ayah - 1];

				if (typeof spesificAyah === 'undefined') {
					res.status(200).json({
						...success,
						data: {
							...spesificSurah,
						},
					});
				} else {
					res.status(200).json({
						...success,
						data: {
							surah: { ...spesificSurah.asma },
							ayah: { ...spesificAyah },
						},
					});
				}
			}
		}
	},
};

module.exports = Controller;
