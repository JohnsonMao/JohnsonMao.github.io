/**
 * The function enables language-sensitive date and time formatting.
 *
 * @example
 * import { formatDate } from '@/utils/formatDate';
 *
 * formatDate('2023/7/8', 'en'); // 'July 8, 2023'
 */
export function formatDate(
  date: DateOrDateString,
  locale = 'zh-TW',
  options: Intl.DateTimeFormatOptions = { dateStyle: 'long' }
) {
  return new Intl.DateTimeFormat(locale, options).format(
    typeof date === 'string' ? new Date(date) : date
  );
}

/**
 * Compare two dates or date strings and determine their relative order.
 *
 * @example
 * import { compareDates } from '@/utils/formatDate';
 *
 * compareDates('2023/7/8', '2023/7/9'); // 1
 * compareDates('2023/7/8', '2023/7/9', true); // -1
 * ['2023/7/8', '2023/7/9'].sort(compareDates); // ['2023/7/9', '2023/7/8']
 */
export function compareDates(
  date1: DateOrDateString,
  date2: DateOrDateString,
  ascending = false
) {
  const comparison = new Date(date1) > new Date(date2) ? 1 : -1;
  return ascending ? comparison : -comparison;
}
