// @flow

import React                                                      from "react";
import { Button, Panel, PanelHeader, Placeholder, PullToRefresh } from "@vkontakte/vkui";
import LeftPanelHeaderButtons                                     from "../../../components/controlls/LeftPanelHeaderButtons";
import { useEvents }                                              from "../../../hooks/useEvents";
import useMyTickets                                               from "../../../hooks/useMyTickets";
import TicketInfo                                                 from "./TicketInfo";
import Icon56InboxOutline                                         from '@vkontakte/icons/dist/56/inbox_outline';
import { go }                                                     from "../../../utils/default/url";

type P = {
  id: MainViewId
};

export default function MainMainPanel(p: P) {
  const [events, refresh, fetching] = useEvents(),
    tickets = useMyTickets(events);

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons />}>Мои билеты</PanelHeader>
      <PullToRefresh onRefresh={refresh} isFetching={fetching}>
      {tickets &&
        tickets.map(t => (
          <TicketInfo key={`ticket-info-${t._id}`} ticket={t} isQrCode />
        ))}
        {
          (!tickets || tickets.length === 0) && (
            <Placeholder
              icon={<Icon56InboxOutline />}
              action={<Button size="l" level="tertiary" onClick={() => go('/events')}>Все события</Button>}
              stretched
            >
              У вас пока нет<br />билетов
            </Placeholder>
          )
        }
      </PullToRefresh>
    </Panel>
  );
}
