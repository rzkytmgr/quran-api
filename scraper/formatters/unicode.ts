export const toUnicodeEscapeSequence = (text: string): string =>
  text
    .split('')
    .map((character) => `\\u${('0000' + character.charCodeAt(0).toString(16)).slice(-4)}`)
    .join('');
