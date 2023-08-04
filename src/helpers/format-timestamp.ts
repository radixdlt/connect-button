export const formatTimestamp = (timestamp: number | string, divider = ' ') => {
  const date = new Date(Number(timestamp))

  return `${date.getDate()} ${date.toLocaleString('en-US', {
    month: 'short',
  })}${divider}${date.toLocaleTimeString('en-Gb', {
    // en-GB is causing midnight to be 00:00
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })}`
}
