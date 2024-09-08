/**
 * Formats a date string to a locale specific date
 * @param {String} date Date to be formatted
 * @returns {String} Formatted date
 */
export default function dateFormatter(date: string): string {
  const dateObj = new Date(date);
  if (dateObj.toString() === 'Invalid Date') {
    return 'No release date available';
  }
  return dateObj.toLocaleDateString(
    new Intl.DateTimeFormat(navigator.language).resolvedOptions().locale
  );
}
