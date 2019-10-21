// @flow

import { useMemo }      from "react";
import _                from "lodash";
import { getLocalDate } from "../utils/default/date";

const getPrice = (event: DanceEvent, type: TicketType) => {
  const now = Date.now();
  let price = { ...event };
  if (event.prices) {
    const p = _.chain(event.prices)
      .filter(p => getLocalDate(p.date).getTime() < now)
      .sortBy(p => getLocalDate(p.date).getTime())
      .reverse()
      .head()
      .value();
    if (p) price = p;
  }
  switch (type) {
    case "double-pass":
      return price.doublePrice;
    default:
      return price.singlePrice;
  }
};

export default function usePrice(event: ?DanceEvent, type: TicketType) {
  return useMemo(() => event ? getPrice(event, type) : 0, [event, type]);
}
