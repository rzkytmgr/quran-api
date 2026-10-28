import type { NextFunction, Request, Response } from 'express';
import { describe, expect, test, vi } from 'vitest';
import { wrapper } from '../src/core/http/wrapper';

describe('controller wrapper', () => {
  test('should throw an error', () => {
    expect(
      wrapper((req, res, next) => {
        throw new Error('Something Error, please check');
      }),
    ).toThrowError();
  });

  test('should forward async rejection to next(err)', async () => {
    const nextMock = vi.fn() as unknown as NextFunction;
    const rejectionError = new Error('async failure');

    const wrapped = wrapper(async () => {
      throw rejectionError;
    });

    await wrapped({} as unknown as Request, {} as unknown as Response, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith(rejectionError);
  });

  test('should not call next with an error when the handler succeeds', async () => {
    const nextMock = vi.fn() as unknown as NextFunction;

    const wrapped = wrapper(async () => undefined);

    await wrapped({} as unknown as Request, {} as unknown as Response, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(0);
  });
});
