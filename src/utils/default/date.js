// @flow

export function getLocalDate(timestamp: number) {
  const now = new Date();
  return new Date(timestamp + now.getTimezoneOffset() * 60 * 1000)
}