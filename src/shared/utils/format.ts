const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Converts English digits in a string to Persian digits for display. */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

/** Formats a Toman amount with thousands separators and Persian digits. */
export function formatToman(amount: number): string {
  const withSeparators = amount.toLocaleString("en-US");
  return `${toPersianDigits(withSeparators)} تومان`;
}

/** Formats a plain number with thousands separators and Persian digits. */
export function formatNumber(amount: number): string {
  return toPersianDigits(amount.toLocaleString("en-US"));
}

/** Groups a 16-digit card number into 4-digit chunks: 1234 5678 9012 3456 */
export function formatCardNumber(cardNumber: string): string {
  const digitsOnly = cardNumber.replace(/\s/g, "");
  const groups = digitsOnly.match(/.{1,4}/g) ?? [digitsOnly];
  return toPersianDigits(groups.join(" "));
}

/** Masks all but the last 4 digits of a card number: •••• •••• •••• 3456 */
export function maskCardNumber(cardNumber: string): string {
  const digitsOnly = cardNumber.replace(/\s/g, "");
  const last4 = digitsOnly.slice(-4);
  return `•••• •••• •••• ${toPersianDigits(last4)}`;
}

/** Formats a Sheba/IBAN number with IR prefix spacing: IR12 3456 7890 ... */
export function formatSheba(sheba: string): string {
  const clean = sheba.toUpperCase().replace(/\s/g, "");
  const prefix = clean.slice(0, 4);
  const rest = clean.slice(4).match(/.{1,4}/g) ?? [];
  return [prefix, ...rest].join(" ");
}

/** Validates an Iranian mobile number, e.g. 09121234567 */
export function isValidMobileNumber(value: string): boolean {
  return /^09\d{9}$/.test(value.trim());
}

/** Formats an ISO date string to a short Persian-friendly date. */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const formatted = new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
  }).format(date);
  return formatted;
}

export function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
