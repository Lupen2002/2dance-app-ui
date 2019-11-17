// @flow

import React from "react";
import { Cell, Group, List } from "@vkontakte/vkui";
import useUserById from "../../../../../hooks/useUserById";
import useNavigate from "../../../../../hooks/useNavigate";
import useUserToken from "../../../../../hooks/useUserToken";

type P = {};

const roles = ["root"];

export default function AdminSettings(p: P) {
  const [go, params] = useNavigate(),
    token = useUserToken(true);
  const [user] = useUserById(parseInt(params.vk_user_id), token);

  return (
    <>
      {user && roles.find(r => r === user.role) && (
        <Group title="Администратор">
          <List>
            <Cell expandable onClick={() => go("/global-settings/moderation")}>
              Модерация
            </Cell>
          </List>
        </Group>
      )}
    </>
  );
}
