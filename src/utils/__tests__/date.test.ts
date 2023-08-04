import { DateOrDateString, compareDates, formatDate } from '../date';

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

describe('Compare dates function', () => {
  it('should return correct relative order', () => {
    expect(compareDates('2023/12/25', '2023/1/1')).toBe(-1);
    expect(compareDates('2023/10/10', '2023/12/31')).toBe(1);
    expect(compareDates('2023/2/28', '2023/2/28')).toBe(1);
  });

  it('should sort dates in ascending and descending order', () => {
    const dates: DateOrDateString[] = [
      '2023/2/2',
      '2023/11/1',
      '2023/2/1',
      '2023/10/1',
      '2023/1/1',
    ];
    const descendingExpected = [
      '2023/11/1',
      '2023/10/1',
      '2023/2/2',
      '2023/2/1',
      '2023/1/1',
    ];

    expect(dates.sort(compareDates)).toStrictEqual(descendingExpected);
    expect(
      dates.sort((date1, date2) => compareDates(date1, date2, true))
    ).toStrictEqual(descendingExpected.concat().reverse());
  });
});
