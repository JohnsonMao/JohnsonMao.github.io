import { toFixedNumber } from '../math';

describe('math function', () => {
  it.each([
    [0, 1],
    [1, 1.3],
    [2, 1.35],
    [3, 1.346],
  ])(
    'should round a number to the specified number of decimal places',
    (digits, expected) => {
      // Arrange
      const input = 1.3456;
      // Act
      const result = toFixedNumber(digits)(input);
      // Assert
      expect(result).toBe(expected);
    }
  );
});
