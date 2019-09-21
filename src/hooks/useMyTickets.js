// @flow

import {useState, useEffect} from 'react';
import { getTickets }        from "../api";
import useStartParams        from "./useStartParams";

export default function useMyTickets() {
  const [ticket, setTicket] = useState<?Ticket>(null),
        params = useStartParams();

  useEffect(() => {
    getTickets().then( (tickets: Ticket[]) => {
      const t = tickets.find( row => {
        console.log('!!! useMyTickets::useEffect::getTickets::then::tickets.find', row, params, Date.parse(row.toDate));
        return row.vkUserId === parseInt(params.vk_user_id) && Date.parse(row.toDate) > Date.now()
      });
      setTicket(t)
    })
  }, []);

  return ticket;
}