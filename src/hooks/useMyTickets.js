// @flow

import { useState, useEffect, useMemo } from "react";
import { getTickets } from "../api";
import { getQueryParams } from "hookrouter";

export default function useMyTickets(events: ?(DanceEvent[])): ?(RichTicket[]) {
  const [tickets, setTickets] = useState<?(RichTicket[])>(null),
    params = useMemo(getQueryParams, []);

  useEffect(() => {
    if (events && !tickets) {
      getTickets().then((tickets: Ticket[]) => {
        const filtered = tickets.filter(row => {
          return (
            row.vkUserId === parseInt(params.vk_user_id) &&
            row.vkGroupId === parseInt(params.vk_group_id) &&
            (row.ymOperationId || row.transactionId) &&
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
  }, [params, events, tickets]);

  return tickets;
}
