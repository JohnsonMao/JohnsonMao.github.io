/** Round a number to a specified number of decimal places. */
export const toFixedNumber = (digits: number) => (value: number) => {
  const pow = Math.pow(10, digits);

  return Math.round(value * pow) / pow;
};
