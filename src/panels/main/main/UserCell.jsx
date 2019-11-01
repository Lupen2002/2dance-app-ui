// @flow

import React, { useState, useEffect }  from "react";
import { Avatar, Cell, InfoRow }       from "@vkontakte/vkui";
import vkConnect                       from "@vkontakte/vkui-connect-promise";
import useUserToken                    from "../../../hooks/useUserToken";
import { getUsersByParams, postUsers } from "../../../api";
import useUserById                     from "../../../hooks/useUserById";

type P = {
  userId: number
};

export const UserCell = (p: P) => {
  const token = useUserToken(true),
        [user] = useUserById(p.userId, token);

  return (
    <>
      {user && (
        <>
          <Cell before={<Avatar size={40} src={user.vkUser.photo_100} />}>
            <InfoRow title="">
              {user.vkUser.first_name} {user.vkUser.last_name}
            </InfoRow>
          </Cell>
        </>
      )}
    </>
  );
};
