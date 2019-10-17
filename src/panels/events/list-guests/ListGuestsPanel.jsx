// @flow

import React from "react";
import { Panel, PanelHeader, PanelSpinner } from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { back } from "../../../utils/default/url";
import { getQueryParams } from "hookrouter";
import { useEventById } from "../../../hooks/useEventById";
import ListGuests from "./ListGuests";

type P = {
  id: EventsViewId
};

export default function ListGuestPanel(p: P) {
  const eventId = getQueryParams().event_id;
  const event = useEventById(eventId);

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="back" back={back} />}>
        Список гостей
      </PanelHeader>
      {!event && <PanelSpinner />}
      {event && <ListGuests event={event} />}
    </Panel>
  );
}
