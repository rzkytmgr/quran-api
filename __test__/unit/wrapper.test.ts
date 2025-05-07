import {
  describe,
  expect,
  test,
} from 'vitest';
import { Wrapper } from '../../src/utils/wrapper';

describe('controller wrapper', () => {
  test('should throw an error', () => {
    expect(Wrapper((req, res, next) => {
      throw new Error('Something Error, please check');
    })).toThrowError();
  });
});
