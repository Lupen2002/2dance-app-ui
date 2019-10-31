// @flow

import React from "react";
import {
  Panel,
  PanelHeader,
  PanelSpinner,
  PullToRefresh
} from "@vkontakte/vkui";
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
  const [event, refresh] = useEventById(eventId),
    [fetching, setFetching] = React.useState(false);

  const onRefresh = React.useMemo(
    () => async () => {
      setFetching(true);
      await refresh();
      setFetching(false);
    },
    [refresh, setFetching]
  );

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="back" back={back} />}>
        Список гостей
      </PanelHeader>
      {!event && <PanelSpinner />}
      {event && (
        <>
          <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
            <ListGuests event={event} />
          </PullToRefresh>
        </>
      )}
    </Panel>
  );
}
