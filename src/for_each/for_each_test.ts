import { test, runTests, assertEquals } from '../deps.ts';

import for_each from './for_each.ts';

test({
  name: 'for_each test',
  fn() {
    assertEquals(typeof for_each, 'function');
  }
});

runTests();