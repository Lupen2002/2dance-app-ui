// @flow

import { useEffect } from "react";
import vkConnect from "@vkontakte/vkui-connect-promise";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../store/actions";

export default function useUserToken() {
  const token = useSelector<AppState, ?string>(state => state.user.token),
    dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      vkConnect
        .send("VKWebAppGetAuthToken", {
          app_id: 7062331,
          scope: "groups,stats"
        })
        .then(res => {
          dispatch(appActions.user.setToken(res.data.access_token));
        });
    }
  }, [token]);

  return token;
}
