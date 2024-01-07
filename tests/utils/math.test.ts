import { toFixedNumber, clamp } from '@/utils/math';

describe('math function', () => {
  it.each([
    [0, 1.3456, 1],
    [1, 1.3456, 1.3],
    [2, 1.3456, 1.35],
    [3, 1.3456, 1.346],
  ])(
    'should round a number to the specified number of decimal places',
    (digits, input, expected) => {
      const result = toFixedNumber(digits)(input);
      expect(result).toBe(expected);
    }
  );
});

describe('clamp function', () => {
  it.each([
    [1, 3, 2, 2],
    [1, 3, 4, 3],
    [1, 3, 0, 1],
    [3, 1, 2, 2],
    [3, 1, 4, 3],
    [3, 1, 0, 1],
  ])(
    'should clamp a number between the given range',
    (number1, number2, number, expected) => {
      const result = clamp(number1, number2)(number);
      expect(result).toBe(expected);
    }
  );
});
