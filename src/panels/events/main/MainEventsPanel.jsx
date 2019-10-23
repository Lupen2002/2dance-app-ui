// @flow

import React, { useEffect } from "react";
import {
  CellButton,
  Group,
  List,
  Panel,
  PanelHeader,
  PanelSpinner
} from "@vkontakte/vkui";
import { useEvents } from "../../../hooks/useEvents";
import useUserToken from "../../../hooks/useUserToken";
import EventCell from "./EventCell";
import { getQueryParams, navigate, setQueryParams } from "hookrouter";
import { go } from "../../../utils/default/url";

type P = {
  id: EventsViewId,
  setPopout: (?React$Node) => void
};

export const MainEventsPanel = (p: P) => {
  const { vk_viewer_group_role, ...params } = getQueryParams();

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
        <>
          {(vk_viewer_group_role === "admin" ||
            vk_viewer_group_role === "moder"||
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
    </Panel>
  );
};
