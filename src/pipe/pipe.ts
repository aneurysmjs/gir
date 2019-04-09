import { for_each } from '../for_each/mod.ts';

const pipe = (...fns: Array<Function>) => (arg: any) => {
  let copiedArg = arg;
  for_each((fn: Function) => {
    copiedArg = fn(copiedArg);
  }, fns);
  return copiedArg;
};

export default pipe;
