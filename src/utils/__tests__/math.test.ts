import { clamp, pipe, toFixedNumber } from '../math';

describe('math function', () => {
  it.each<[number, number, number, number]>([
    [15, 15, 20, 0],
    [-5, -5, -20, 0],
    [0, -5, 20, 0],
    [0, 15, -20, 0],
    [20, 50, 20, 0],
    [-20, -50, -20, 0],
    [-10, 0, -20, -10],
    [-10, 0, -10, -20],
    [10, 0, 10, 20],
    [10, 0, 20, 10],
    [5, 5, 20, -20],
  ])(
    '%#. should correctly clamp a value (%o) within the specified range',
    (expected, input, ...params) => {
      expect(clamp(...params)(input)).toBe(expected);
    }
  );

  it('should process an input value through a series of functions in sequence', () => {
    expect(pipe(1)).toBe(1);
    expect(pipe(2, (n) => n * 2)).toBe(4);
    expect(
      pipe(
        3,
        (n) => n * 3,
        (n) => n + 2
      )
    ).toBe(11);
    expect(
      pipe(
        4,
        (n) => n * 2,
        (n) => n / 3,
        (n) => n.toFixed(2)
      )
    ).toBe('2.67');
  });

  it('should round a number to the specified number of decimal places', () => {
    const input = 1.3456;
    expect(toFixedNumber(0)(input)).toBe(1);
    expect(toFixedNumber(1)(input)).toBe(1.3);
    expect(toFixedNumber(2)(input)).toBe(1.35);
    expect(toFixedNumber(3)(input)).toBe(1.346);
  });
});
