// @flow

import React                                     from 'react'
import { Cell, Group, List, Panel, PanelHeader } from "@vkontakte/vkui";
import { getQueryParams, navigate }              from "hookrouter";

type P = {
  id: MenuViewId
}

export const SettingsPanel = (p: P) => {
  const params = getQueryParams();

  return (
    <Panel id={p.id}>
      <PanelHeader>Настройки</PanelHeader>
      <Group>
        <List>
          <Cell
            expandable
            onClick={() => navigate("/menu/yandex-money-receiver", params)}
          >
            Яндек Кошелек
          </Cell>
          <Cell expandable>Цена одиночного пасса</Cell>
          <Cell expandable>Цена парного пасса</Cell>
        </List>
      </Group>
    </Panel>
  )
};