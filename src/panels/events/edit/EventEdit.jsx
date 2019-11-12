// @flow

import React, { useMemo } from "react";
import { Panel, PanelHeader, PanelSpinner } from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { useEventById } from "../../../hooks/useEventById";
import EventForm from "./EventForm";
import { putEvents } from "../../../api";
import useNavigate from "../../../hooks/useNavigate";

type P = {
  id: EventsViewId
};

export default function EventEdit(p: P) {
  const [go, params] = useNavigate();
  const [event] = useEventById(params.event_id);

  const onSubmit = useMemo(
    () => (newEvent: DanceEvent) => {
      putEvents(newEvent).then(() => {
        go("/events");
      });
    },
    [go]
  );

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="back"
            back={() => go("/events")}
          />
        }
      >
        {event ? event.label : "Загрузка..."}
      </PanelHeader>
      {!event && <PanelSpinner />}
      {event && <EventForm event={event} onSubmit={onSubmit} />}
    </Panel>
  );
}
