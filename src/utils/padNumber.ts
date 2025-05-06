const padNumber = (num: number | string, length: number): string => {
  return String(num).padStart(length, '0').toString();
};

export { padNumber };
