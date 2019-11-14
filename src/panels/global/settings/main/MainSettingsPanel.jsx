// @flow

import React from "react";
import { Group, Panel, PanelHeader } from "@vkontakte/vkui";
import { List, Cell } from "@vkontakte/vkui";
import useUserById from "../../../../hooks/useUserById";
import useNavigate from "../../../../hooks/useNavigate";
import useUserToken from "../../../../hooks/useUserToken";
import CityCell from "./CityCell";

type P = {
  id: string
};

const roles = ["root"];

export default function MainSettingsPanel(p: P) {
  const [go, params] = useNavigate(),
    token = useUserToken(true);
  const [user] = useUserById(parseInt(params.vk_user_id), token);

  return (
    <Panel id={p.id}>
      <PanelHeader>Настройки</PanelHeader>
      {user && roles.find(r => r === user.role) && (
        <Group title="Администратор">
          <List>
            <Cell expandable onClick={() => go("/global-settings/moderation")}>
              Модерация
            </Cell>
          </List>
        </Group>
      )}
      <Group title="Основные">
        {token && user && (
          <List>
            <CityCell token={token} user={user}/>
          </List>
        )}
      </Group>
    </Panel>
  );
}
