// @flow

export function makeDateString(event: DanceEvent) {
  const eventDate = new Date();
  eventDate.setTime(event.timestamp);

  const yyyy = eventDate.getFullYear(),
    mm = eventDate.getMonth() + 1,
    dd = eventDate.getDate();

  return yyyy + "-" + mm + "-" + dd;
}

export function makeTimeString(event: DanceEvent) {
  const eventDate = new Date();
  eventDate.setTime(event.timestamp);

  return eventDate.toLocaleTimeString();
}
