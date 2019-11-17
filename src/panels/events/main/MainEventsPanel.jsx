// @flow

import React, { useEffect }               from "react";
import {
  CellButton,
  Group,
  List,
  Panel,
  PanelHeader,
  PanelSpinner,
  PullToRefresh
}                                         from "@vkontakte/vkui";
import { useEvents }                      from "../../../hooks/useEvents";
import useUserToken                       from "../../../hooks/useUserToken";
import EventCell                          from "./EventCell";
import useCheckRole                       from "../../../hooks/useCheckRole";
import useNavigate                        from "../../../hooks/useNavigate";

type P = {
  id: EventsViewId,
  setPopout: (?React$Node) => void,
  activePanel: EventsViewId
};

const roles = ["admin", "editor"];

export const MainEventsPanel = (p: P) => {
  const isAccessAdd = useCheckRole(roles),
        [go, params, add, setParams] = useNavigate();

  useEffect(() => {
    const {event_id, pass, sec, ...q} = params;
    if (event_id || pass || sec) {
      setParams(q);
    }
  }, [params, setParams]);

  useUserToken();

  const [events, refresh, fetching] = useEvents();

  return (
    <Panel id={p.id}>
      <PanelHeader>Вечеринки</PanelHeader>
      {!events && <PanelSpinner />}
      <PullToRefresh onRefresh={refresh} isFetching={fetching}>
        {events && (
          <>
            {isAccessAdd && (
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
