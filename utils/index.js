export function toPersianNumber(num) {
  return String(num).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])
}
export function truncateText(text, maxLength = 100) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}
