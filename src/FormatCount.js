// FormatCount.js
export function formatCount(viewCount) {
  if (viewCount >= 1000000) {
    // Format as million
    return (viewCount / 1000000).toFixed(1) + "m";
  } else if (viewCount >= 1000) {
    // Format as thousand
    return (viewCount / 1000).toFixed(1) + "k";
  } else {
    return viewCount?.toString();
  }
}
