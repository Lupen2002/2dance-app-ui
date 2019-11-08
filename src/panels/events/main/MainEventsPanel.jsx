// @flow

import React, { useEffect } from "react";
import {
  CellButton,
  Group,
  List,
  Panel,
  PanelHeader,
  PanelSpinner,
  PullToRefresh
} from "@vkontakte/vkui";
import { useEvents } from "../../../hooks/useEvents";
import useUserToken from "../../../hooks/useUserToken";
import EventCell from "./EventCell";
import { getQueryParams, navigate, setQueryParams } from "hookrouter";
import { go } from "../../../utils/default/url";

type P = {
  id: EventsViewId,
  setPopout: (?React$Node) => void,
  activePanel: EventsViewId
};

export const MainEventsPanel = (p: P) => {
  const { vk_viewer_group_role } = getQueryParams();

  useEffect(() => {
    if (p.activePanel === p.id) {
      setQueryParams({
        ...getQueryParams(),
        event_id: undefined,
        pass: undefined,
        sec: undefined
      });
    }
  }, [p]);

  useUserToken();

  const [events, refresh, fetching] = useEvents();

  return (
    <Panel id={p.id}>
      <PanelHeader>Вечеринки</PanelHeader>
      {!events && <PanelSpinner />}
      <PullToRefresh onRefresh={refresh} isFetching={fetching}>
        {events && (
          <>
            {(vk_viewer_group_role === "admin" ||
              vk_viewer_group_role === "moder" ||
              vk_viewer_group_role === "editor") && (
              <Group>
                <CellButton
                  align="center"
                  onClick={() => go("/menu/add-event")}
                  before={<i className="fas fa-plus" />}
                >
                  Добавить
                </CellButton>
              </Group>
            )}
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
          </>
        )}
      </PullToRefresh>
    </Panel>
  );
};
