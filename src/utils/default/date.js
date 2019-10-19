// @flow
import Sugar from 'sugar'

export function getLocalDate(timestamp: number|string) {
  const date = new Sugar.Date(timestamp);

  date.setUTC(false);

  return date.raw;
}