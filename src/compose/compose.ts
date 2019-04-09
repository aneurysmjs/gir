import { pipe } from '../pipe/mod.ts';

const compose = (...fns: Array<Function>) => pipe(...fns.reverse());

export default compose;
