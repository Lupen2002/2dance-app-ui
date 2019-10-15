// @flow

import React from "react";
import useMyTickets from "../../../hooks/useMyTickets";

type P = {
  event: DanceEvent
};

export default function CountTickets(p: P) {
  const tickets = useMyTickets([p.event]);

  return tickets ? <>Куплено пассов: {tickets.length}</> : <></>;
}
