const { filterParams } = require('../util/helper');

test('Filter Params', () => {
	expect(filterParams('test')).toBeTruthy();
	expect(filterParams('5')).toBeFalsy();
	expect(filterParams('1test')).toBeTruthy();
	expect(filterParams('test1')).toBeTruthy();
	expect(filterParams(undefined)).toBeFalsy();
	expect(filterParams(NaN)).toBeTruthy();
});
