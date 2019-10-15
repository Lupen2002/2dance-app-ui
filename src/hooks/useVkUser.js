// @flow

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {appActions} from '../store/actions'
import connect from "@vkontakte/vkui-connect-promise";


export default function useVkUser(): ?VKUser {
  const user = useSelector((state: AppState) => state.user.current);
  const dispatch: AppDispatch = useDispatch();

  const updateUser = async () => {
    if (!user) {
      const userRes = await connect.send(
        "VKWebAppGetUserInfo",
        {}
      );
      dispatch(appActions.user.setCurrent(userRes.data));
    }
  };

  React.useEffect(() => {
    updateUser().catch(console.error);
  }, [user]);

  return user
}
