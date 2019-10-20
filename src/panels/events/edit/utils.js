// @flow

import { getLocalDate } from "../../../utils/default/date";

export function dateLocal2ISO(src: string) {
  return src.split('.').reverse().join('-');
}

export function makeDateString(event: DanceEvent) {
  const eventDate = getLocalDate(event.timestamp);

  return dateLocal2ISO(eventDate.toLocaleDateString())
}

export function makeTimeString(event: DanceEvent) {
  const eventDate = getLocalDate(event.timestamp);

  return eventDate.toLocaleTimeString();
}
