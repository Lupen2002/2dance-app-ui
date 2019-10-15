// @flow

import { getLocalDate } from "../../../utils/default/date";

export function makeDateString(event: DanceEvent) {
  const eventDate = getLocalDate(event.timestamp);

  const iso = eventDate.toISOString().split('T');

  console.log('!!! makeDateString', iso);

  return iso[0];
}

export function makeTimeString(event: DanceEvent) {
  const eventDate = getLocalDate(event.timestamp);

  return eventDate.toLocaleTimeString();
}
