// @flow

import React            from 'react'
import useUserById      from "../../../../hooks/useUserById";
import useUserToken     from "../../../../hooks/useUserToken";
import { Avatar, Cell } from "@vkontakte/vkui";

type P = {
  id: number,
  onClick: number => Promise<void>
}

export default function UserListItem(p: P) {
  const token = useUserToken(true);
  const [user] = useUserById(p.id, token);

  const avatar = user ? <Avatar size={48} src={user.vkUser.photo_100}/> : <i className='fas fa-spinner fa-spin'/>;

  return (
    <Cell before={avatar} onClick={() => p.onClick(p.id)}>
      {user ? user.vkUser.last_name + " " + user.vkUser.first_name : p.id}
    </Cell>
  )
}
