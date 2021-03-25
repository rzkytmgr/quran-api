const numberFormatter = number => String(number < 10 ? '00' + number : number < 100 ? '0' + number : number);
const filterParams = params => (isNaN(Number(params)) && typeof params !== 'undefined' ? true : false);
module.exports = { numberFormatter, filterParams };
