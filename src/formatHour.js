// formatHour.js

export function formatHour(hour) {
  const formattedNumber = parseInt(hour, 10);
  const parts = formattedNumber.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
