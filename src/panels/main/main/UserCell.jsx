// @flow

import React, { useState, useEffect } from "react";
import { Avatar, Cell, InfoRow } from "@vkontakte/vkui";
import vkConnect from "@vkontakte/vkui-connect-promise";
import useUserToken from "../../../hooks/useUserToken";
import { getUsersByParams, postUsers } from "../../../api";

type P = {
  userId: number
};

const vkGetUserById = (id: number, token: string) => ({
  method: "users.get",
  params: {
    user_ids: id,
    fields: "sex,photo_100",
    v: "5.101",
    access_token: token
  }
});

const getUser = async (id: number, token: string): Promise<VKUser> => {
  const cacheUsers: User[] = await getUsersByParams({ vkId: id });
  if (cacheUsers.length > 0) {
    return cacheUsers[0].vkUser;
  } else {
    const res = await vkConnect.send(
      "VKWebAppCallAPIMethod",
      vkGetUserById(id, token)
    );
    await postUsers({ vkUser: res.data.response[0], vkId: id, role: "user" });
    return res.data.response[0];
  }
};

export const UserCell = (p: P) => {
  const [user, setUser] = useState(null),
    token = useUserToken(true);

  useEffect(() => {
    if (token) {
      getUser(p.userId, token).then(u => {
        setUser(u);
      });
    }
  }, [token, p.userId]);

  return (
    <>
      {user && (
        <>
          <Cell before={<Avatar size={40} src={user.photo_100} />}>
            <InfoRow title="">
              {user.first_name} {user.last_name}
            </InfoRow>
          </Cell>
        </>
      )}
    </>
  );
};
