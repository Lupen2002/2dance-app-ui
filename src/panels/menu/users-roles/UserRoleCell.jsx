// @flow

import React from "react";
import { Avatar, Cell } from "@vkontakte/vkui";
import useUserById from "../../../hooks/useUserById";
import Icon24MoreHorizontal from "@vkontakte/icons/dist/24/more_horizontal";

type P = {
  role: UserRoleGroup,
  token: string,
  onMore: number => void
};

export default function UserRoleCell(p: P) {
  const [user] = useUserById(p.role.vkUserId, p.token);

  if (user) {
    return (
      <Cell
        before={<Avatar size={42} src={user.vkUser.photo_100} />}
        description={p.role.role}
        asideContent={<Icon24MoreHorizontal onClick={() => p.onMore(p.role.vkUserId)} />}
      >
        {user.vkUser.first_name} {user.vkUser.last_name}
      </Cell>
    );
  } else {
    return (
      <Cell before={<Avatar size={42} />} description={p.role.role}>
        {p.role.vkUserId}
      </Cell>
    );
  }
}
