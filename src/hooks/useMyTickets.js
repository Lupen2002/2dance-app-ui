// @flow

import { useState, useEffect } from "react";
import { getTickets } from "../api";
import useStartParams from "./useStartParams";

export default function useMyTickets(transaction: ?string) {
  const [ticket, setTicket] = useState<?Ticket>(null),
    params = useStartParams();

  useEffect(() => {
    getTickets().then((tickets: Ticket[]) => {
      const t = tickets.find(row => {
        return (
          row.vkUserId === parseInt(params.vk_user_id) &&
          row.groupId === parseInt(params.vk_group_id) &&
          Date.parse(row.toDate) > Date.now()
        );
      });
      setTicket(t);
    });
  }, [transaction]);

  return ticket;
}
