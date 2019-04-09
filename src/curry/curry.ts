export default function curry(fn: Function, length?: number): Function {
  const fnLength = length || fn.length;
  return function currified(...args) {
    if (args.length === 0) {
      return currified;
    }
    if (args.length >= fnLength) {
      return fn.apply(this, args);
    }
    // Suggest using the spread operator instead of .apply(). (prefer-spread)
    // BAD: const child = fn.bind.apply(fn, [this].concat(args));
    const child = fn.bind(fn, ...args);
    return curry(child, fnLength - args.length);
  };
}
