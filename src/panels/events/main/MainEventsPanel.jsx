// @flow

import React, {useEffect} from "react";
import { Group, List, Panel, PanelHeader, PanelSpinner } from "@vkontakte/vkui";
import { useEvents } from "../../../hooks/useEvents";
import useUserToken from "../../../hooks/useUserToken";
import EventCell from "./EventCell";
import { getQueryParams, setQueryParams } from "hookrouter";

type P = {
  id: EventsViewId,
  setPopout: (?React$Node) => void
};

export const MainEventsPanel = (p: P) => {
  useEffect(() => {
    setQueryParams({
      ...getQueryParams(),
      event_id: undefined,
      pass: undefined,
      sec: undefined
    });
  }, []);
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
              <EventCell
                key={`event-cell-${e._id}`}
                event={e}
                setPopout={p.setPopout}
              />
            ))}
          </List>
        </Group>
      )}
    </Panel>
  );
};
