// @flow

import React, { useMemo, useState } from "react";
import { Cell, Counter, Group, Panel, PanelHeader } from "@vkontakte/vkui";
import { List, ModalRoot, ModalPage } from "@vkontakte/vkui";
import useNavigate from "../../../../hooks/useNavigate";
import AdminSettings from "./admin/AdminSettings";
import useGroupCities from "./hooks/useGroupCities";

type P = {
  id: string,
  setModal: React$Node => void
};

export default function MainSettingsPanel(p: P) {
  const [go] = useNavigate();
  const [cities] = useGroupCities();

  return (
    <Panel id={p.id}>
      <PanelHeader>Настройки</PanelHeader>
      <AdminSettings />
      {cities && (
        <Group title="Города">
          <List>
            {cities.map(c => (
              <Cell
                key={'city-'+c.id}
                onClick={() => go("/global-events/main/" + c.id)}
                indicator={<Counter>{c.count}</Counter>}
              >
                {c.title}
              </Cell>
            ))}
          </List>
        </Group>
      )}
    </Panel>
  );
}
