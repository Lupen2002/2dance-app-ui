// @flow

const validId: EventsViewId[] = [
  "main",
  "reg-on-reception",
  "bay-pass",
  "second-user",
  "pay",
  "ym-success",
  "edit",
  "alt-pay",
  'list-guests'
];

export function extractEventViewId(src?: string): EventsViewId {
  return validId.find(row => row === src) || "main";
}
