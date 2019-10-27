// @flow

import { useMemo } from "react";
import _           from "lodash";
import useDiscount from "./useDiscount";

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
  const price = useMemo(() => event ? getPrice(event, type) : 0, [event, type]),
        discount = useDiscount(event);

  const rePostDiscount = event ? event.rePostDiscount||0 : 0;

  return (discount && price) ? price - rePostDiscount : price
}
