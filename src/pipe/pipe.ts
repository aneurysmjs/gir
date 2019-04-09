import { forEach } from '../for_each/mod.ts';

const pipe = (...fns: Array<Function>) => (arg: any) => {
  let copiedArg = arg;
  forEach((fn: Function) => {
    copiedArg = fn(copiedArg);
  }, fns);
  return copiedArg;
};

export default pipe;
