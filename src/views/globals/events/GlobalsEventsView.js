// @flow

import React, { useState, useEffect } from "react";
import { Avatar, Panel, PanelHeader } from "@vkontakte/vkui";
import { PanelSpinner, View }         from "@vkontakte/vkui";
import { Group, List, Cell }          from "@vkontakte/vkui";
import { extractMainViewId }          from "./utils";
import { getGroups }                  from "../../../api";
import Moment                         from "react-moment";

type P = {
  id: EpicGlobalViewId,
  activePanel?: string
};

export default function GlobalsEventsView(p: P) {
  const activePanel = extractMainViewId(p.activePanel);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    getGroups().then(res =>
      setGroups(res.filter(g => g.app.status === "show"))
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
                  before={<Avatar size={46} src={g.photo_100} />}
                >
                  {g.name} - {g.start_date && <Moment format="DD.MM.YYYY" date={g.start_date*1000} />}
                </Cell>
              ))}
          </List>
        </Group>
      </Panel>
    </View>
  );
}
