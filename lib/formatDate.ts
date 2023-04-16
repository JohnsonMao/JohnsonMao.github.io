function formatDate(date: Date | string, locale = 'zh-TW') {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
    typeof date === 'string' ? new Date(date) : date
  );
}

export default formatDate;
