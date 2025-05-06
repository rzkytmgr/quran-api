/** This function used for resolve JSON file with imutable behaviour */
const jsonResolver = async <T>(filename: string | string[]): Promise<T> => {
  const data = await import(`@db/${Array.isArray(filename) ? filename.join('/') : filename}.db.json`);
  return JSON.parse(JSON.stringify(data.default));
};

export { jsonResolver };
