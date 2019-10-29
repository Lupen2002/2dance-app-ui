// @flow

import { useState, useEffect, useMemo } from "react";
import { getTickets }                   from "../api";
import { getQueryParams }               from "hookrouter";

export default function useTicketsToApprovePay(token: ?string) {
  const [altPay, setAltPay] = useState<?(Ticket[])>(null);

  const refresh = useMemo(
    () => async () => {
      if (token) {
        const groupId = parseInt(getQueryParams().vk_group_id);
        const tickets: Ticket[] = await getTickets();
        setAltPay(
          tickets.filter(
            (t: Ticket) =>
              t.vkGroupId === groupId && t.altPay && !t.altPay.approve
          )
        );
      }
    },
    [token]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [altPay, refresh];
}
