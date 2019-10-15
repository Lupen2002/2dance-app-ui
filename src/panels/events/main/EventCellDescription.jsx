// @flow

import React, { useMemo } from "react";
import CountTickets       from "./CountTickets";
import { getLocalDate }   from "../../../utils/default/date";

type P = {
  event: DanceEvent
};

export default function EventCellDescription(p: P) {
  const strDate = useMemo(() => {
    const date = getLocalDate(p.event.timestamp);
    return date.toLocaleString();
  }, [p.event]);

  return (
    <>
      {strDate}
      <br />
      <CountTickets event={p.event} />
    </>
  );
}
