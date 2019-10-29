// @flow

import { useState, useEffect, useMemo } from "react";
import { getUsersByParams, postUsers }  from "../api";
import vkConnect                        from "@vkontakte/vkui-connect-promise";

const getUsers = (ids: string, token: string) => ({
  method: "users.get",
  params: {
    fields: "sex,photo_100",
    user_ids: ids,
    v: "5.102",
    access_token: token
  }
});

export default function useUserById(id: number, token: ?string) {
  const [user, setUser] = useState<?User>();

  const refresh = useMemo(
    () => async () => {
      if (token) {
        const cache = await getUsersByParams({ vkId: id });
        if (cache.length > 0) {
          setUser(cache[0]);
        } else {
          const vkUser = (await vkConnect.send("VKWebAppCallAPIMethod", getUsers(id+'', token))).data;
          setUser(await postUsers({vkId: id, vkUser, role: 'user'}));
        }
      }
    },
    [id, token]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return user;
}
