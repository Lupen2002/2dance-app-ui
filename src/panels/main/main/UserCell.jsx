// @flow

import React, { useState, useEffect } from "react";
import { Avatar, Cell, InfoRow } from "@vkontakte/vkui";
import vkConnect from "@vkontakte/vkui-connect-promise";
import useUserToken from "../../../hooks/useUserToken";

type P = {
  userId: number
};

export const UserCell = (p: P) => {
  const [user, setUser] = useState(null),
    token = useUserToken(true);

  useEffect(() => {
    if (token) {
      vkConnect
        .send("VKWebAppCallAPIMethod", {
          method: "users.get",
          params: {
            user_ids: p.userId,
            fields: "photo_50",
            v: "5.101",
            access_token: token
          }
        })
        .then(({ data }) => {
          setUser(data.response[0]);
        });
    }
  }, [token, p.userId]);

  return (
    <>
      {user && (
        <>
          <Cell before={<Avatar size={40} src={user.photo_50} />}>
            <InfoRow title=''>{user.first_name} {user.last_name}</InfoRow>
          </Cell>
        </>
      )}
    </>
  );
};
