// @flow

import React, { useState, useEffect } from "react";
import { Avatar, Panel, PanelHeader } from "@vkontakte/vkui";
import { PanelSpinner, View } from "@vkontakte/vkui";
import { Group, List, Cell } from "@vkontakte/vkui";
import { extractMainViewId } from "./utils";
import { getGroups } from "../../../api";
import Moment from "react-moment";

type P = {
  id: EpicGlobalViewId,
  activePanel?: string
};

export default function GlobalsEventsView(p: P) {
  const activePanel = extractMainViewId(p.activePanel);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const now = Date.now();
    getGroups().then((res: VkGroup[]) =>
      setGroups(
        res
          .filter(
            g =>
              g.app.status === "show" &&
              g.start_date &&
              typeof g.start_date === "number" &&
              g.start_date * 1000 > now
          )
          .sort((a, b) => a.start_date - b.start_date)
      )
    );
  }, []);

  return (
    <View activePanel={activePanel} id={p.id}>
      <Panel id="main">
        <PanelHeader>Все события</PanelHeader>
        {!groups && <PanelSpinner />}
        <Group>
          <List>
            {groups &&
              groups.map((g: VkGroup) => (
                <Cell
                  key={g.id + ""}
                  size="l"
                  description={<Moment format="DD.MM.YYYY HH:mm" date={g.start_date * 1000} />}
                  before={<Avatar size={46} src={g.photo_100} />}
                >
                  {g.name}
                </Cell>
              ))}
          </List>
        </Group>
      </Panel>
    </View>
  );
}
