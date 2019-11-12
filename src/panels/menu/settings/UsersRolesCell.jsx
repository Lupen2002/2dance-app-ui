// @flow

import React from "react";
import useCheckRole from "../../../hooks/useCheckRole";
import { go } from "../../../utils/default/url";
import { Cell } from "@vkontakte/vkui";

type P = {};
const roles = ["admin"];

export default function UsersRolesCell(p: P) {
  const isAccess = useCheckRole(roles);

  return (
    <>
      {isAccess && (
        <Cell expandable onClick={() => go("/menu/users-roles")}>
          Права пользователей
        </Cell>
      )}
    </>
  );
}
