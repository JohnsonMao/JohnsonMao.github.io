type UnaryFunction<A, B> = (a: A) => B;

/** Processes an input value through a series of functions in sequence. */
export function pipe<T>(input: T): T;
export function pipe<T, A>(input: T, fn1: UnaryFunction<T, A>): A;
export function pipe<T, A, B>(
  input: T,
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>
): B;
export function pipe<T, A, B, C>(
  input: T,
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>
): C;
export function pipe<T, A, B, C, D>(
  input: T,
  fn1: UnaryFunction<T, A>,
  fn2: UnaryFunction<A, B>,
  fn3: UnaryFunction<B, C>,
  fn4: UnaryFunction<C, D>,
): D;

export function pipe(
  input: unknown,
  ...functions: UnaryFunction<unknown, unknown>[]
) {
  return functions.reduce((value, fn) => fn(value), input);
}

/** Restricts the given value within a specified range. */
export function clamp(value: number, a: number, b = 0) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  return Math.min(Math.max(value, min), max);
}
