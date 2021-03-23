const numberFormatter = number => String(number < 10 ? '00' + number : number < 100 ? '0' + number : number);
module.exports = { numberFormatter };
