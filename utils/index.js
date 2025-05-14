export function toPersianNumber(num) {
  return String(num).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])
}
