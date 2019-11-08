// @flow

import React, { useMemo } from "react";
import CountTickets       from "./CountTickets";
import { getLocalDate }   from "../../../utils/default/date";
import { getQueryParams } from "hookrouter";

type P = {
  event: DanceEvent
};

export default function EventCellDescription(p: P) {
  const { ...query } = getQueryParams();
  const strDate = useMemo(() => {
    const date = getLocalDate(p.event.timestamp);
    return date.toLocaleString();
  }, [p.event]);

  return (
    <>
      {query.vk_viewer_group_role === 'admin' && <div>id: {p.event._id}</div>}
      {strDate}
      <br />
      {query.vk_viewer_group_role === 'admin' && <CountTickets event={p.event} />}
    </>
  );
}
