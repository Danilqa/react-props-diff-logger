export function getLocaleTimeWithMs() {
  const now = new Date();
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  const timeString = now.toLocaleTimeString('en-US', { hour12: false });

  return `${timeString}.${milliseconds}` as const;
}
