/** Round a number to a specified number of decimal places. */
export const toFixedNumber = (digits: number) => (value: number) => {
  const pow = Math.pow(10, digits);

  return Math.round(value * pow) / pow;
};

export const clamp = (number1: number, number2: number) => (number: number) => {
  const min = Math.min(number1, number2);
  const max = Math.max(number1, number2);

  if (Number.isNaN(number) || number < min) {
    return min;
  }
  if (number > max) {
    return max;
  }
  return number;
};
