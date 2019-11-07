// @flow

import React, { useState } from "react";
import { List } from "@vkontakte/vkui";
import UserListItem from "./UserListItem";

type P = {
  users: number[],
  onSelect: number => Promise<void>,
};

export default function SelectUserList(p: P) {
  const [disable, setDisable] = useState(false);

  const onSelect = async (id: number) => {
    if (!disable) {
      setDisable(true);
      await p.onSelect(id);
      setDisable(false);
    }
  };

  return (
    <List>
      {p.users.map(u => (
        <UserListItem key={"user-list-item-" + u} id={u} onClick={onSelect} />
      ))}
    </List>
  );
}
