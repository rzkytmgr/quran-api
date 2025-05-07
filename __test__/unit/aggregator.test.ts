import {
  describe,
  expect,
  test,
} from 'vitest';
import { aggregator } from '../../src/utils/aggregator';

describe('aggregate array or object', () => {
  test('simple aggregate', () => {
    expect(aggregator({
      firstname: 'foo',
      lastname: 'bar',
    }, {
      age: 18,
      links: {
        github: 'foobar',
      },
    })).toMatchObject({
      firstname: 'foo',
      lastname: 'bar',
      age: 18,
      links: {
        github: 'foobar',
      },
    });
  });

  test('deep aggregate 1 or more object level', () => {
    expect(aggregator({
      fullname: 'Foobar bin Yuzad',
      gender: 'male',
      socials: {
        github: 'Foobar bin yuzad',
      },
    }, {
      bio: 'sometext will be here',
      socials: {
        facebook: 'Foobar bin Yuzad',
      },
    })).toMatchObject({
      fullname: 'Foobar bin Yuzad',
      gender: 'male',
      socials: {
        github: 'Foobar bin yuzad',
        facebook: 'Foobar bin Yuzad',
      },
    });

    expect(aggregator({
      fullname: 'foobar',
      socials: {
        meta: {
          facebook: 'myfoobar',
        },
      },
    }, {
      socials: {
        github: 'foobar',
        meta: {
          threads: 'foobarth',
        },
      },
    })).toMatchObject({
      fullname: 'foobar',
      socials: {
        github: 'foobar',
        meta: {
          facebook: 'myfoobar',
          threads: 'foobarth',
        },
      },
    });

    expect(aggregator([{ fullname: 'Ricas' }], [{ fullname: 'Gracias' }])).toMatchObject([{
      fullname: 'Gracias',
    }]);

    expect(aggregator([{ details: ['headache'] }], [{ details: ['stomatch ache', 'fever'] }])).toMatchObject([{
      details: ['stomatch ache', 'fever'],
    }]);

    expect(aggregator([{
      socials: {
        facebook: null,
      },
    }], [{
      socials: {
        github: 'foobar',
      },
    }])).toMatchObject([{
      socials: {
        github: 'foobar',
        facebook: null,
      },
    }]);
  });
});
