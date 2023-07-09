/**
 * The function enables language-sensitive date and time formatting.
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
