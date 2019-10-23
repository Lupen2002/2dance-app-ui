// @flow

import React, { useMemo, useCallback, useEffect }           from "react";
import { CellButton, Group, Panel, PanelHeader } from "@vkontakte/vkui";
import { getQueryParams, navigate }              from "hookrouter";
import useMyTickets                              from "../../../hooks/useMyTickets";
import { useEvents }                             from "../../../hooks/useEvents";
import PanelSpinner                              from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner";
import TicketInfo                                from "../../main/main/TicketInfo";
import { ticketPay }                             from "../../../utils/yandex/metrics";

type P = {
  id: EventsViewId
};

export default function YMSuccess(p: P) {
  const { uuid, ...params } = useMemo(getQueryParams, []);
  const events = useEvents(true),
    tickets = useMyTickets(events);

  const current: ?RichTicket = useMemo(() => {
    return tickets && tickets.find(t => t.uuid === uuid);
  }, [uuid, tickets]);

  const onClick = useCallback(() => {
    navigate('/', false, params)
  }, [params]);

  useEffect(() => {
    current && current.amount && ticketPay(current.amount)
  }, [current]);

  return (
    <Panel id={p.id}>
      <PanelHeader>Платеж прошел</PanelHeader>
      {!current && <PanelSpinner />}
      {current && (
        <>
          <TicketInfo ticket={current} />
          <Group>
            <CellButton onClick={onClick}>Отлично!</CellButton>
          </Group>
        </>
      )}
    </Panel>
  );
}
