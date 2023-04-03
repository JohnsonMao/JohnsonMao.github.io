function getFormattedDate(date: Date | string, locales = 'zh-TW') {
	return new Intl.DateTimeFormat(locales, { dateStyle: 'long' }).format(
		typeof date === 'string' ? new Date(date) : date
	);
}

export default getFormattedDate;
