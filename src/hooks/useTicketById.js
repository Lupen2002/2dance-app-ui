// @flow

import { useState, useEffect, useMemo } from "react";
import { getTickets } from "../api";
import { getQueryParams } from "hookrouter";
import useStartParams from "./useStartParams";
import { useEventById } from "./useEventById";

export default function useTicketById(id?: string): ?RichTicket {
  const [ticket, setTicket] = useState<?Ticket>(null),
    [rich, setRich] = useState<?RichTicket>(null),
        [event] = useEventById(ticket && ticket.eventId);

  useEffect(() => {
    if (id) {
      (async () => {
        const tickets = await getTickets(id);
        const find = tickets.find(t => t._id === id);
        setTicket(find);
      })();
    }
  }, [id]);

  useEffect(() => {
    if (ticket && event) {
      setRich({
        ...ticket,
        event
      });
    }
  }, [ticket, event]);

  return rich;
}
