import { toFixedNumber } from '../math';

describe('math function', () => {
  it('should round a number to the specified number of decimal places', () => {
    const input = 1.3456;
    expect(toFixedNumber(0)(input)).toBe(1);
    expect(toFixedNumber(1)(input)).toBe(1.3);
    expect(toFixedNumber(2)(input)).toBe(1.35);
    expect(toFixedNumber(3)(input)).toBe(1.346);
  });
});
