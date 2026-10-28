const padNumber = (value: number | string, length: number): string => String(value).padStart(length, '0');

export { padNumber };
