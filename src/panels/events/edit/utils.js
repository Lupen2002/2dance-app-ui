// @flow

import { getLocalDate } from "../../../utils/default/date";

export function makeDateString(event: DanceEvent) {
  const eventDate = getLocalDate(event.timestamp);

  const iso = eventDate.toLocaleDateString().split('.');

  return iso.reverse().join('-');
}

export function makeTimeString(event: DanceEvent) {
  const eventDate = getLocalDate(event.timestamp);

  return eventDate.toLocaleTimeString();
}
