function getFormattedDate(date: Date | string) {
	return new Intl.DateTimeFormat('zh-TW', { dateStyle: 'long' }).format(
		typeof date === 'string' ? new Date(date) : date
	);
}

export default getFormattedDate;
