// @flow

import React, { useState, useEffect } from "react";
import {
  Avatar,
  Panel,
  PanelHeader,
  PanelSpinner,
  View
}                                     from "@vkontakte/vkui";
import { Group, List, Cell, Button }  from "@vkontakte/vkui";
import { extractMainViewId }          from "./utils";
import { getGroups, putGroups }       from "../../../api";
import Moment                         from "react-moment";

type P = {
  id: EpicGlobalViewId,
  activePanel?: string
};

export default function GlobalsModerationView(p: P) {
  const activePanel = extractMainViewId(p.activePanel);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    getGroups().then( res => setGroups(res.filter(g => g.app.status === 'new')));
  }, []);

  const onClick = (g: VkGroup, status: 'show' | 'ignored') => async () => {
    const app = {status};
    await putGroups({...g, app});
    getGroups().then( res => setGroups(res.filter(g => g.app.status === 'new')));
  };

  return (
    <View activePanel={activePanel} id={p.id}>
      <Panel id="main">
        <PanelHeader>Модерация</PanelHeader>
        {!groups && <PanelSpinner />}
        <Group>
          <List>
            {groups &&
              groups.map((g: VkGroup) => (
                <Cell
                  key={g.id+''}
                  size='l'
                  description={g.start_date && <Moment format="DD.MM.YYYY" date={g.start_date*1000} />}
                  bottomContent={
                    <div style={{ display: 'flex' }}>
                      <Button size="m" onClick={onClick(g, 'show')}>Добавить</Button>
                      <Button size="m" onClick={onClick(g, 'ignored')} level="secondary" style={{ marginLeft: 8 }}>Скрыть</Button>
                    </div>
                  }
                  before={<Avatar size={46} src={g.photo_100} />}>
                  {g.name} - {g.id}
                </Cell>
              ))}
          </List>
        </Group>
      </Panel>
    </View>
  );
}
