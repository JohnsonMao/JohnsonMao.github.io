/**
 * The function enables language-sensitive date and time formatting.
 * 
 * @example
 * import formatDate from '@/utils/formatDate';
 * 
 * formatDate('2023/7/8', 'en'); // 'July 8, 2023'
 */
function formatDate(
  date: Date | string,
  locale = 'zh-TW',
  options: Intl.DateTimeFormatOptions = { dateStyle: 'long' }
) {
  return new Intl.DateTimeFormat(locale, options).format(
    typeof date === 'string' ? new Date(date) : date
  );
}

export default formatDate;
