// @flow

import React from "react";
import {
  Group,
  List,
  Panel,
  PanelHeader,
  PanelSpinner
} from "@vkontakte/vkui";
import { useEvents } from "../../../hooks/useEvents";
import useUserToken from "../../../hooks/useUserToken";
import EventCell from "./EventCell";

type P = {
  id: EventsViewId
};

export const MainEventsPanel = (p: P) => {
  useUserToken();

  const events = useEvents();

  return (
    <Panel id={p.id}>
      <PanelHeader>Вечеринки</PanelHeader>
      {!events && <PanelSpinner />}
      {events && (
        <Group>
          <List>
            {events.map((e: DanceEvent) => (
              <EventCell key={`event-cell-${e._id}`} event={e} />
            ))}
          </List>
        </Group>
      )}
    </Panel>
  );
};
