// @flow
import Sugar from 'sugar'

export function getLocalDate(timestamp: number|string) {
  const date = new Sugar.Date(timestamp);

  date.setUTC(false);

  return date.raw;
}

export function getISODate(timestamp?: number|string) {
  const date = timestamp ? new Sugar.Date(timestamp) : new Sugar.Date();
  date.setUTC(false);
  return date.format('{yyyy}-{MM}-{dd}T{HH}:{mm}')
}
