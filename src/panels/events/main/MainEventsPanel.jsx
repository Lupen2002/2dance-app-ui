// @flow

import React from "react";
import { Cell, Group, List, Panel, PanelHeader } from "@vkontakte/vkui";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { getQueryParams, navigate } from "hookrouter";
import { useEvents } from "../../../hooks/useEvents";
import CountTickets from "./CountTickets";
import useUserToken from "../../../hooks/useUserToken";

type P = {
  id: EventsViewId
};

export const MainEventsPanel = (p: P) => {
  useUserToken();

  const query = getQueryParams(),
    events = useEvents();

  const go = (event_id: string) => () => {
    navigate("/events/bay-pass", false, { ...query, event_id });
  };

  return (
    <Panel id={p.id}>
      <PanelHeader>Вечеринки</PanelHeader>
      <Group>
        <List>
          {events &&
            events.map((e: DanceEvent) => (
              <Cell
                key={`event-${e._id}`}
                before={<Avatar size={72} />}
                description={
                  <>
                    {new Date(e.timestamp).toLocaleString()}
                    <br />
                    <CountTickets event={e} />
                  </>
                }
                bottomContent={
                  <div>
                    <Button size="m" onClick={go(e._id)}>
                      Купить пасс
                    </Button>
                  </div>
                }
                size="l"
              >
                {e.label}
              </Cell>
            ))}
        </List>
      </Group>
    </Panel>
  );
};
