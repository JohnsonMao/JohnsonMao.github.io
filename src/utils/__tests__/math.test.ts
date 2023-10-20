import { clamp } from '../math';

describe('clamp function', () => {
  it.each<[number, number, number, number | undefined]>([
    [15, 15, 20, undefined],
    [-5, -5, -20, undefined],
    [0, -5, 20, undefined],
    [0, 15, -20, undefined],
    [20, 50, 20, undefined],
    [-20, -50, -20, undefined],
    [-10, 0, -20, -10],
    [-10, 0, -10, -20],
    [10, 0, 10, 20],
    [10, 0, 20, 10],
    [5, 5, 20, -20],
  ])(
    '%#. should correctly clamp a value (%o) within the specified range',
    (expected, ...params) => {
      expect(clamp(...params)).toBe(expected);
    }
  );
});
