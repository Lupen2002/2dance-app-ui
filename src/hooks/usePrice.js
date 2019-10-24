// @flow

import { useMemo }      from "react";
import _                from "lodash";

const getPrice = (event: DanceEvent, type: TicketType) => {
  const now = Date.now();
  let price = { ...event };
  if (event.prices) {
    const p = _.chain(event.prices)
      .filter(p => p.timestamp < now)
      .sortBy(p => p.timestamp)
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
