import formatDate from "../formatDate";

describe('Format date function', () => {
  it('should display the date format in Taiwan', () => {
    const date = formatDate(new Date('2023/7/8'));

    expect(date).toBe('2023年7月8日');
  });

  it('should display the date format in American', () => {
    const date = formatDate('2023/7/8', 'en-us');

    expect(date).toBe('July 8, 2023');
  });
});
