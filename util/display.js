const { PORT = '3001', BASE_URI = `https://localhost:${PORT}` } = require('./config');

const preBismillah = {
	text: {
		ar: '\ufeff\u0628\u0650\u0633\u0652\u0645\u0650\u0020\u0627\u0644\u0644\u0651\u064e\u0647\u0650\u0020\u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650\u0020\u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650',
		read: 'Bismillaahir Rahmaanir Raheem',
	},
	translation: {
		en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
		id: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
	},
};

const home = {
	endpoint: {
		imam: {
			list: `${BASE_URI}/imam`,
			each: `${BASE_URI}/imam/:id`,
		},
		quran: {
			list: `${BASE_URI}/quran`,
			spesific: {
				surah: `${BASE_URI}/quran{/:surah}`,
				ayah: `${BASE_URI}/quran{/:surah}{/:ayah}`,
			},
		},
	},
	author: 'Rizky Aulia Tumangger | @rzkytmgr | rzkytmgr[at]gmail.com',
	docs: 'https://github.com/rzkytmgr/Quran-API',
};

const success = {
	status: 200,
	message: 'success',
};

const error = {
	status: 404,
	message: 'error',
};

module.exports = { home, error, success, preBismillah };
