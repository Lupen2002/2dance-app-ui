// @flow

import { getLocalDate } from "../../../utils/default/date";

type HasTimestamp = {
  timestamp: number
}

export function dateLocal2ISO(src: string) {
  return src.split('.').reverse().join('-');
}

export function makeDateString(event: HasTimestamp) {
  const eventDate = getLocalDate(event.timestamp);

  return dateLocal2ISO(eventDate.toLocaleDateString())
}

export function makeTimeString(event: HasTimestamp) {
  const eventDate = getLocalDate(event.timestamp);

  return eventDate.toLocaleTimeString();
}
