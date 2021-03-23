const { numberFormatter } = require('../util/helper');

test('Surah and Ayah number formatter', () => {
	expect(numberFormatter(1)).toMatch('001');
	expect(numberFormatter(12)).toMatch('012');
	expect(numberFormatter(114)).toMatch('114');
});
