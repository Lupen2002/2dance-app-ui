// @flow

import React         from "react";
import useMyTickets  from "../../../hooks/useMyTickets";
import useAllTickets from "../../../hooks/useAllTickets";

type P = {
  event: DanceEvent
};

export default function CountTickets(p: P) {
  const tickets = useAllTickets([p.event]);

  return tickets ? <>Записалось: {tickets.length}</> : <></>;
}
