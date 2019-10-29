// @flow

import { useState, useEffect } from "react";
import { getTickets } from "../api";
import { getQueryParams } from "hookrouter";

export default function useAllTickets(events: ?(DanceEvent[])): ?(RichTicket[]) {
  const [tickets, setTickets] = useState<?(RichTicket[])>(null);

  useEffect(() => {
    if (events && !tickets) {
      const vkGroupId = getQueryParams().vk_group_id;

      getTickets().then((tickets: Ticket[]) => {
        const filtered = tickets.filter(row => {
          return (
            row.vkGroupId === parseInt(vkGroupId) &&
            (row.ymOperationId || row.transactionId || (row.altPay && row.altPay.approve) ) &&
            !!events.find(e => e._id === row.eventId)
          );
        });
        const enriched: RichTicket[] = filtered.map(t => ({
          ...t,
          event: events.find(e => e._id === t.eventId)
        }));
        setTickets(enriched);
      });
    }
  }, [events, tickets]);

  return tickets;
}
