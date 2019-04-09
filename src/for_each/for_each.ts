import { curry } from '../curry/mod.ts';

const for_each = curry((fn: Function, arr: Array<any>): Array<any> => {
  for (const i of arr) {
    fn(arr[i]);
  }
  return arr;
});

export default for_each;
