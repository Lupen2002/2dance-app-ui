// @flow

import React, { useMemo } from "react";
import CountTickets from "./CountTickets";
import { getLocalDate } from "../../../utils/default/date";
import useCheckRole from "../../../hooks/useCheckRole";

type P = {
  event: DanceEvent
};

const roles: RoleType[] = ["admin", "editor"];

export default function EventCellDescription(p: P) {
  const isAdmin = useCheckRole(roles);
  const strDate = useMemo(() => {
    const date = getLocalDate(p.event.timestamp);
    return date.toLocaleString();
  }, [p.event]);

  return (
    <>
      {isAdmin && <div>id: {p.event._id}</div>}
      {strDate}
      <br />
      {isAdmin && <CountTickets event={p.event} />}
    </>
  );
}
