// @flow

import React, { useMemo } from "react";
import { Cell, Group, List, Panel, PanelHeader } from "@vkontakte/vkui";
import { navigate } from "hookrouter";
import useStartParams from "../../../hooks/useStartParams";

type P = {
  id: MenuViewId
};

export const SettingsPanel = (p: P) => {
  const params = useStartParams();

  const ymSetting = useMemo(
    () => () => navigate("/menu/yandex-money-receiver", false, params),
    [params]
  );

  return (
    <Panel id={p.id}>
      <PanelHeader>Настройки</PanelHeader>
      {params && params.vk_viewer_group_role === "admin" && (
        <Group title="Администратор">
          <List>
            <Cell expandable onClick={ymSetting}>
              Яндек Кошелек
            </Cell>
          </List>
        </Group>
      )}
    </Panel>
  );
};
