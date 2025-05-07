import {
  describe,
  expect,
  test,
} from 'vitest';
import { padNumber } from '../../src/utils/padNumber';

describe('number zero pad formatter', () => {
  test('custom number pad', () => {
    expect(padNumber(6, 3)).toEqual('006');
    expect(padNumber(62, 3)).toEqual('062');
    expect(padNumber(325, 3)).toEqual('325');
    expect(padNumber(6244, 3)).toEqual('6244');
    expect(padNumber('6', 5)).toEqual('00006');
    expect(padNumber('62', 2)).toEqual('62');
  });
});
