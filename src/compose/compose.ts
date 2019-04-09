import { pipe } from '../pipe/mod';

const compose = (...fns: Array<Function>) => pipe(...fns.reverse());

export default compose;
