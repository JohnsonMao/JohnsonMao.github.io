import { compareDates, formatDate } from '@/utils/date';

describe('Format date function', () => {
  it('should display the date format in Taiwan', () => {
    const date = new Date('2023/7/8');
    const expected = '2023年7月8日';
    const result = formatDate(date);
    expect(result).toBe(expected);
  });

  it('should display the date format in American', () => {
    const date = '2023/7/8';
    const expected = 'July 8, 2023';
    const result = formatDate(date, 'en-us');
    expect(result).toBe(expected);
  });
});

describe('Compare dates function', () => {
  it('should sort dates in descending order', () => {
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
    const result = dates.sort(compareDates);
    expect(result).toStrictEqual(expected);
  });

  it('should sort dates in ascending order', () => {
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
    const result = dates.sort((...dates) => compareDates(...dates, true));
    expect(result).toStrictEqual(expected);
  });
});
