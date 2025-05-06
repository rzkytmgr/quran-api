import * as R from 'ramda';

type AggregatorArguments = Record<string, unknown> | readonly object[] | object;

const aggregator = <T>(source: AggregatorArguments, dest: AggregatorArguments): T => {
  if (Array.isArray(source) && Array.isArray(dest)) {
    return R.zipWith(R.mergeDeepRight, source, dest) as T;
  } else {
    return R.mergeDeepRight(source, dest) as T;
  }
};

export { aggregator };
