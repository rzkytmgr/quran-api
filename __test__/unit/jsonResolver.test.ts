import {
  describe,
  expect,
  test,
} from 'vitest';
import { jsonResolver } from '../../src/utils/jsonResolver';

describe('JSON module resolver', () => {
  test('positive resolve json file', async () => {
    const json = await jsonResolver('EntireReciters') as Array<unknown>;
    expect(typeof json).toEqual('object');
    expect(json).toBeInstanceOf(Array);
    expect(json[0]).toHaveProperty('id');
  });

  test('negative resolve json file', async () => {
    await expect(jsonResolver('FileDoesntExistInDbDirectory')).rejects.toThrow();
    await expect(jsonResolver(['It', 'Also', 'Accept', 'Array'])).rejects.toThrow();
  });
});
