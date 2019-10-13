// @flow

import { getLocalDate } from "../../../utils/default/date";

export function makeDateString(event: DanceEvent) {
  const eventDate = getLocalDate(event.timestamp);

  const yyyy = eventDate.getFullYear(),
    mm = eventDate.getMonth() + 1,
    dd = eventDate.getDate();

  return yyyy + "-" + mm + "-" + dd;
}

export function makeTimeString(event: DanceEvent) {
  const eventDate = getLocalDate(event.timestamp);

  return eventDate.toLocaleTimeString();
}
