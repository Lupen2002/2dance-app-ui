// @flow

import { useState, useEffect } from "react";
import { getTickets } from "../api";

export default function useTicketsById(id?: string): ?Ticket {
  const [ticket, setTicket] = useState<?Ticket>(null);

  useEffect(() => {
    getTickets().then((tickets: Ticket[]) => {
      const t = tickets[0];
      setTicket(t);
    });
  }, [id]);

  return ticket;
}
