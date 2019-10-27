// @flow

import React                           from "react";
import { useDispatch, useSelector }    from "react-redux";
import {appActions}                    from '../store/actions'
import connect                         from "@vkontakte/vkui-connect-promise";
import { getQueryParams }              from "hookrouter";
import { getUsersByParams, postUsers } from "../api";


export default function useVkUser(): ?VKUser {
  const user = useSelector((state: AppState) => state.user.current);
  const dispatch: AppDispatch = useDispatch();

  const updateUser = async () => {
    if (!user) {
      const vkId = parseInt(getQueryParams().vk_user_id);
      const cacheUsers: User[] = await getUsersByParams({vkId});
      if (cacheUsers.length > 0) {
        dispatch(appActions.user.setCurrent(cacheUsers[0].vkUser));
      } else {
        const vkUser: VKUser = await connect.send(
          "VKWebAppGetUserInfo",
          {}
        );
        await postUsers({vkId, vkUser, role: 'user'});
        dispatch(appActions.user.setCurrent(vkUser));
      }

    }
  };

  React.useEffect(() => {
    updateUser().catch(console.error);
  }, [user]);

  return user
}
