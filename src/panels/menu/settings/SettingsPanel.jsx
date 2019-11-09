// @flow

import React from "react";
import { Group, List, Panel, PanelHeader } from "@vkontakte/vkui";
import YmSettingCell from "./YMSettingCell";
import CheckAltPayCell from "./CheckAltPayCell";
import PayKindsCell from "./PayKindsCell";
import UsersRolesCell from "./UsersRolesCell";
import AllowMessageCell from "./AllowMessageCell";

type P = {
  id: MenuViewId
};

export const SettingsPanel = (p: P) => {
  return (
    <Panel id={p.id}>
      <PanelHeader>Настройки</PanelHeader>
      <Group title="Администратор">
        <List>
          <YmSettingCell />
          <AllowMessageCell />
          <CheckAltPayCell />
          <PayKindsCell />
          <UsersRolesCell />
        </List>
      </Group>
    </Panel>
  );
};
