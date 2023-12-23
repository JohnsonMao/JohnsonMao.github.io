import { compareDates, formatDate } from '../date';

describe('Format date function', () => {
  it('should display the date format in Taiwan', () => {
    // Arrange
    const date = new Date('2023/7/8');
    const expected = '2023年7月8日';
    // Act
    const result = formatDate(date);
    // Assert
    expect(result).toBe(expected);
  });

  it('should display the date format in American', () => {
    // Arrange
    const date = '2023/7/8';
    const expected = 'July 8, 2023';
    // Act
    const result = formatDate(date, 'en-us');
    // Assert
    expect(result).toBe(expected);
  });
});

describe('Compare dates function', () => {
  it('should sort dates in descending order', () => {
    // Arrange
    const dates: DateOrDateString[] = [
      '2023/2/2',
      '2023/11/1',
      '2023/2/1',
      '2023/10/1',
      '2023/1/1',
    ];
    const expected = [
      '2023/11/1',
      '2023/10/1',
      '2023/2/2',
      '2023/2/1',
      '2023/1/1',
    ];
    // Act
    const result = dates.sort(compareDates);
    // Assert
    expect(result).toStrictEqual(expected);
  });
  it('should sort dates in ascending order', () => {
    // Arrange
    const dates: DateOrDateString[] = [
      '2023/2/2',
      '2023/11/1',
      '2023/2/1',
      '2023/10/1',
      '2023/1/1',
    ];
    const expected = [
      '2023/1/1',
      '2023/2/1',
      '2023/2/2',
      '2023/10/1',
      '2023/11/1',
    ];
    // Act
    const result = dates.sort((date1, date2) =>
      compareDates(date1, date2, true)
    );
    // Assert
    expect(result).toStrictEqual(expected);
  });
});
