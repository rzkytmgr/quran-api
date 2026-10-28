import * as r from 'ramda';

type IAggregatorArguments = Record<string, unknown> | readonly object[] | object;

const aggregator = <T>(source: IAggregatorArguments, dest: IAggregatorArguments): T => {
  if (Array.isArray(source) && Array.isArray(dest)) {
    return r.zipWith(r.mergeDeepRight, source, dest) as T;
  }
  return r.mergeDeepRight(source, dest) as T;
};

export { aggregator };
